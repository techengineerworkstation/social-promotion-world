-- =============================================
-- SOCIAL PROMOTION WORLD - SUPABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE (extends auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  balance DECIMAL(12, 2) DEFAULT 0.00,
  total_spent DECIMAL(12, 2) DEFAULT 0.00,
  total_orders INT DEFAULT 0,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'reseller')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SERVICES TABLE (your SMM services catalog)
-- =============================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  platform TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_per_1000 DECIMAL(10, 2) NOT NULL,
  min_order INT DEFAULT 100,
  max_order INT DEFAULT 100000,
  avg_delivery_time TEXT,
  guarantee_period TEXT DEFAULT '30 days',
  is_active BOOLEAN DEFAULT true,
  category TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDERS TABLE (track all user orders)
-- =============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  link TEXT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'in progress', 'completed', 'partial', 'cancelled', 'refill')),
  start_count INT DEFAULT 0,
  remains INT DEFAULT 0,
  refill_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TRANSACTIONS TABLE (payments & wallet funding)
-- =============================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'order', 'refund', 'bonus', 'referral')),
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_method TEXT DEFAULT 'paystack',
  payment_reference TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed', 'cancelled')),
  description TEXT,
  metadata JSONB DEFAULT '{}',
  balance_before DECIMAL(12, 2),
  balance_after DECIMAL(12, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- NOTIFICATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- API LOGS (track API usage)
-- =============================================
CREATE TABLE IF NOT EXISTS public.api_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  endpoint TEXT,
  method TEXT,
  request_body JSONB,
  response_body JSONB,
  status_code INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = user_id);

-- Transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Services (everyone can read active services)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON public.services FOR SELECT
  USING (is_active = true);

-- Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update profile timestamp
CREATE OR REPLACE FUNCTION public.handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_profile_update();

-- Update order count & total spent on user profile when order is completed
CREATE OR REPLACE FUNCTION public.handle_order_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.profiles
    SET total_orders = total_orders + 1
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_order_completed
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_order_completion();

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON public.transactions(payment_reference);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_services_platform ON public.services(platform);

-- =============================================
-- SEED DATA (Sample Services)
-- =============================================
INSERT INTO public.services (platform, name, description, price_per_1000, min_order, max_order, avg_delivery_time, guarantee_period, category, sort_order) VALUES
('instagram', 'Instagram Real Followers', 'Active followers from real accounts, low drop rate', 1200.00, 100, 100000, '0-2 hours', '30 days', 'followers', 1),
('instagram', 'Instagram Likes', 'Real-looking likes from active users', 350.00, 50, 50000, '0-1 hour', '30 days', 'likes', 2),
('instagram', 'Instagram Reels Views', 'High-quality reel views, fast start', 180.00, 100, 1000000, '0-30 mins', 'Lifetime', 'views', 3),
('instagram', 'Instagram Story Views', 'Instant story viewers from targeted regions', 250.00, 100, 500000, '0-15 mins', 'Lifetime', 'views', 4),
('instagram', 'Instagram Comments', 'Custom comments from real accounts', 2800.00, 10, 5000, '0-4 hours', '30 days', 'comments', 5),
('youtube', 'YouTube Views (High Retention)', 'Monetizable views with 40%+ watch retention', 1800.00, 1000, 1000000, '0-4 hours', 'Lifetime', 'views', 1),
('youtube', 'YouTube Subscribers', 'Real subscribers, low drop rate', 3500.00, 100, 100000, '0-12 hours', '60 days', 'subscribers', 2),
('youtube', 'YouTube Watch Time', 'Real watch time hours for monetization eligibility', 5200.00, 10, 10000, '0-24 hours', 'Lifetime', 'watchtime', 3),
('tiktok', 'TikTok Video Views', 'Instant viral-style video views', 120.00, 1000, 10000000, '0-15 mins', 'Lifetime', 'views', 1),
('tiktok', 'TikTok Followers', 'Real followers with active profiles', 1500.00, 100, 500000, '0-4 hours', '30 days', 'followers', 2),
('tiktok', 'TikTok Likes', 'Boost engagement on your videos', 450.00, 100, 1000000, '0-1 hour', '30 days', 'likes', 3),
('facebook', 'Facebook Page Likes', 'Real page followers from active accounts', 1100.00, 100, 1000000, '0-3 hours', '30 days', 'likes', 1),
('facebook', 'Facebook Video Views', 'Real video views that count toward monetization', 850.00, 1000, 10000000, '0-2 hours', 'Lifetime', 'views', 2),
('twitter', 'Twitter/X Followers', 'Real followers with active profiles', 1400.00, 100, 500000, '0-3 hours', '30 days', 'followers', 1),
('twitter', 'Twitter/X Retweets', 'Boost tweet visibility with real retweets', 950.00, 50, 500000, '0-2 hours', '30 days', 'retweets', 2),
('telegram', 'Telegram Members', 'Real channel/group members from active users', 1800.00, 100, 1000000, '0-6 hours', '30 days', 'members', 1),
('telegram', 'Telegram Post Views', 'Real post impressions from targeted regions', 150.00, 1000, 10000000, '0-30 mins', 'Lifetime', 'views', 2),
('spotify', 'Spotify Plays', 'Real plays from active listeners', 350.00, 1000, 10000000, '0-2 hours', 'Lifetime', 'plays', 1),
('spotify', 'Spotify Followers', 'Artist/profile followers from real accounts', 1600.00, 100, 500000, '0-6 hours', '30 days', 'followers', 2),
('linkedin', 'LinkedIn Followers', 'Professional network growth', 2500.00, 50, 100000, '0-8 hours', '60 days', 'followers', 1),
('linkedin', 'LinkedIn Connections', '1st-degree connections from professionals', 3200.00, 20, 50000, '0-12 hours', '60 days', 'connections', 2)
ON CONFLICT DO NOTHING;
