# Social Promotion World - Deployment Guide

## Free Domain Options

Since you don't have a spare domain, here are your best options:

### Option 1: Vercel Subdomain (Recommended - Easiest)
- **Domain**: `socialpromotionworld.vercel.app`
- **Cost**: Free
- **Setup**: Automatic when you deploy to Vercel
- **SSL**: Included free
- **Custom domain**: Can add later when you purchase one

### Option 2: Free Domain Providers
| Provider | Domain | Notes |
|----------|--------|-------|
| **Freenom** | `.tk`, `.ml`, `.ga`, `.cf`, `.gq` | Free but sometimes unreliable |
| **is-a.dev** | `socialpromotionworld.is-a.dev` | Free for developers, requires GitHub |
| **pp.ua** | `socialpromotion.pp.ua` | Free Ukrainian domain |
| **No-IP** | `socialpromotion.ddns.net` | Free dynamic DNS |

### Option 3: Keep cPanel Hosting
- Use your existing `socialpromotionworld.hstn.me` domain
- Upload the `dist/` folder contents to `public_html`
- **Limitation**: No server-side API routes (Paystack verification needs external service)

---

## Deployment to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
cd smm-panel-react
git remote add origin https://github.com/YOUR_USERNAME/social-promotion-world.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" → Import your GitHub repo
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   ```
   VITE_SUPABASE_URL = https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   VITE_PAYSTACK_PUBLIC_KEY = pk_live_xxxxxxxxxxxx
   PAYSTACK_SECRET_KEY = sk_live_xxxxxxxxxxxx
   ```
5. Click "Deploy"

Your site will be live at `https://socialpromotionworld.vercel.app`

---

## Supabase Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create New Project
3. Note your Project URL and anon key
4. Go to SQL Editor → Paste contents of `supabase-schema.sql` → Run

### Step 2: Configure Authentication
1. Go to Authentication → Settings
2. Enable Email provider
3. Disable "Confirm email" (for testing, enable in production)
4. Add site URL: `https://socialpromotionworld.vercel.app`

### Step 3: Get Your Keys
- **Project URL**: Settings → API → Project URL
- **anon key**: Settings → API → Project API keys → `anon public`
- **service_role key**: Keep secret (for server-side only)

---

## Paystack Setup

### Step 1: Get API Keys
1. Go to [paystack.com](https://paystack.com) → Sign up/Login
2. Go to Settings → API Keys & Webhooks
3. Copy your **Public Key** (pk_test_ or pk_live_)
4. Copy your **Secret Key** (sk_test_ or sk_live_)

### Step 2: Set Callback URL
- Success URL: `https://socialpromotionworld.vercel.app/payment/callback`
- Webhook URL: `https://socialpromotionworld.vercel.app/api/paystack-webhook`

### Step 3: Test Mode
- Use `pk_test_` and `sk_test_` keys for testing
- Test card: `4123 4501 9999 9999` (any future date, any CVV)

---

## Environment Variables

Create a `.env` file for local development:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxx
```

---

## Deploy to cPanel (Alternative)

If you prefer to use your existing cPanel hosting:

### Step 1: Build Locally
```bash
pnpm install
pnpm run build
```

### Step 2: Upload to cPanel
1. Open cPanel → File Manager
2. Navigate to `public_html`
3. Delete existing files (backup first)
4. Upload ALL contents from `dist/` folder

### Step 3: Paystack Workaround
Since cPanel doesn't support serverless functions, use one of:
- **Option A**: Use a free Railway/Render service for the verify endpoint
- **Option B**: Use Paystack's inline callback (client-side only)
- **Option C**: Use a free PHP host for the verify script

### Step 4: .htaccess for React Router
Create `public_html/.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Recommended Stack (Best Experience)

| Service | Purpose | Cost |
|---------|---------|------|
| **Vercel** | Hosting + API routes | Free |
| **Supabase** | Database + Auth | Free tier (500MB) |
| **Paystack** | Payments | 1.5% + ₦100 per transaction |
| **Vercel Domain** | `socialpromotionworld.vercel.app` | Free |

---

## After Deployment Checklist

- [ ] Supabase schema imported
- [ ] Environment variables set in Vercel
- [ ] Authentication working (signup/login)
- [ ] Paystack test payment successful
- [ ] Wallet balance updates after funding
- [ ] Service detail pages open correctly
- [ ] Pricing table shows Naira
- [ ] Mobile responsive
- [ ] Email verification enabled (production)
- [ ] Switch to Paystack live keys (production)
