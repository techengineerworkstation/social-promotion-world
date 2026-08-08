-- =============================================
-- ADDITIONAL TABLES FOR CRM (run after initial schema)
-- Run this in Supabase SQL Editor
-- =============================================

-- =============================================
-- CART ITEMS TABLE (saved carts before checkout)
-- =============================================
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  link TEXT NOT NULL,
  quantity INT NOT NULL,
  price_per_1000 DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'ordered', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ACTION HISTORY TABLE (user activity log)
-- =============================================
CREATE TABLE IF NOT EXISTS public.action_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('login', 'signup', 'order', 'payment', 'refund', 'profile_update', 'password_change', 'cart_add', 'cart_remove', 'api_call')),
  details TEXT,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SHOPPING HISTORY (completed orders archive)
-- =============================================
CREATE TABLE IF NOT EXISTS public.shopping_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  link TEXT,
  quantity INT,
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  status TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_history ENABLE ROW LEVEL SECURITY;

-- Cart items: users can only see own
CREATE POLICY "Users can manage own cart" ON public.cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Action history: users can only see own
CREATE POLICY "Users can view own history" ON public.action_history
  FOR SELECT USING (auth.uid() = user_id);

-- Shopping history: users can only see own
CREATE POLICY "Users can view own shopping history" ON public.shopping_history
  FOR SELECT USING (auth.uid() = user_id);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_cart_user ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_status ON public.cart_items(status);
CREATE INDEX IF NOT EXISTS idx_action_user ON public.action_history(user_id);
CREATE INDEX IF NOT EXISTS idx_action_type ON public.action_history(action_type);
CREATE INDEX IF NOT EXISTS idx_action_created ON public.action_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shopping_user ON public.shopping_history(user_id);

-- =============================================
-- HELPER FUNCTION: Log user action
-- =============================================
CREATE OR REPLACE FUNCTION public.log_user_action(
  action TEXT,
  detail TEXT DEFAULT NULL,
  meta JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  action_id UUID;
BEGIN
  INSERT INTO public.action_history (user_id, action_type, details, metadata, ip_address)
  VALUES (
    auth.uid(),
    action,
    detail,
    meta,
    current_setting('request.headers', true)::json->>'x-forwarded-for'
  )
  RETURNING id INTO action_id;

  RETURN action_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
