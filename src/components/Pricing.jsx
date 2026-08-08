import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Pricing.css'

const currencies = [
  { code: 'NGN', symbol: '₦', label: 'NGN' },
  { code: 'USD', symbol: '$', label: 'USD' },
  { code: 'GHS', symbol: 'GH₵', label: 'GHS' },
  { code: 'KES', symbol: 'KSh', label: 'KES' },
  { code: 'ZAR', symbol: 'R', label: 'ZAR' },
]

const pricingData = {
  instagram: [
    { id: 'ig-followers', service: 'Instagram Real Followers', desc: 'Active followers, low drop ratio. Refill guarantee included.', prices: { NGN: 1200, USD: 0.80, GHS: 9.60, KES: 96, ZAR: 14.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 100, max: 100000 },
    { id: 'ig-likes', service: 'Instagram Likes', desc: 'Real-looking likes from active profiles. Fast start.', prices: { NGN: 350, USD: 0.23, GHS: 2.80, KES: 28, ZAR: 4.20 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 50000 },
    { id: 'ig-reels', service: 'Instagram Reels Views', desc: 'High-quality reel views. Instant start, lifetime guarantee.', prices: { NGN: 180, USD: 0.12, GHS: 1.44, KES: 14.4, ZAR: 2.16 }, delivery: '0-30 mins', guarantee: 'Lifetime', min: 100, max: 1000000 },
    { id: 'ig-stories', service: 'Instagram Story Views', desc: 'Instant story viewers. Targeted regions available.', prices: { NGN: 250, USD: 0.17, GHS: 2.00, KES: 20, ZAR: 3.00 }, delivery: '0-15 mins', guarantee: 'Lifetime', min: 100, max: 500000 },
    { id: 'ig-impressions', service: 'Instagram Impressions', desc: 'Boost post visibility and reach. Drip-feed available.', prices: { NGN: 150, USD: 0.10, GHS: 1.20, KES: 12, ZAR: 1.80 }, delivery: '0-1 hour', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'ig-comments', service: 'Instagram Custom Comments', desc: 'Custom comments from real accounts. Your text or random.', prices: { NGN: 2800, USD: 1.87, GHS: 22.40, KES: 224, ZAR: 33.60 }, delivery: '0-4 hours', guarantee: '30 days', min: 10, max: 5000 },
    { id: 'ig-saves', service: 'Instagram Saves', desc: 'Increase post save count. Signals engagement to algorithm.', prices: { NGN: 450, USD: 0.30, GHS: 3.60, KES: 36, ZAR: 5.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 50000 },
    { id: 'ig-profile-views', service: 'Instagram Profile Visits', desc: 'Boost profile visibility and authority score.', prices: { NGN: 220, USD: 0.15, GHS: 1.76, KES: 17.6, ZAR: 2.64 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 100, max: 500000 },
    { id: 'ig-reel-likes', service: 'Instagram Reel Likes', desc: 'Likes specifically for Reel posts. High retention.', prices: { NGN: 400, USD: 0.27, GHS: 3.20, KES: 32, ZAR: 4.80 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 100000 },
    { id: 'ig-story-likes', service: 'Instagram Story Likes/Reactions', desc: 'Likes and reactions on story posts.', prices: { NGN: 300, USD: 0.20, GHS: 2.40, KES: 24, ZAR: 3.60 }, delivery: '0-30 mins', guarantee: 'Lifetime', min: 50, max: 100000 },
  ],
  youtube: [
    { id: 'yt-views', service: 'YouTube Views (High Retention)', desc: 'Monetizable views with 40%+ retention. Safe for monetization.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-4 hours', guarantee: 'Lifetime', min: 1000, max: 1000000 },
    { id: 'yt-subscribers', service: 'YouTube Subscribers', desc: 'Real subscribers, low drop rate. Non-drop option available.', prices: { NGN: 3500, USD: 2.33, GHS: 28.00, KES: 280, ZAR: 42.00 }, delivery: '0-12 hours', guarantee: '60 days', min: 100, max: 100000 },
    { id: 'yt-watchtime', service: 'YouTube Watch Time (Hours)', desc: 'Real watch time for monetization eligibility (4000+ hours).', prices: { NGN: 5200, USD: 3.47, GHS: 41.60, KES: 416, ZAR: 62.40 }, delivery: '0-24 hours', guarantee: 'Lifetime', min: 10, max: 10000 },
    { id: 'yt-likes', service: 'YouTube Likes', desc: 'Increase engagement signal. Helps video ranking.', prices: { NGN: 650, USD: 0.43, GHS: 5.20, KES: 52, ZAR: 7.80 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'yt-comments', service: 'YouTube Comments', desc: 'Custom comments from real accounts. Any text you want.', prices: { NGN: 4500, USD: 3.00, GHS: 36.00, KES: 360, ZAR: 54.00 }, delivery: '0-6 hours', guarantee: '30 days', min: 5, max: 5000 },
    { id: 'yt-shares', service: 'YouTube Shares', desc: 'Video shares for social proof and organic reach.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-3 hours', guarantee: 'Lifetime', min: 100, max: 1000000 },
    { id: 'yt-impressions', service: 'YouTube Impressions', desc: 'Increase click-through rate and SERP visibility.', prices: { NGN: 900, USD: 0.60, GHS: 7.20, KES: 72, ZAR: 10.80 }, delivery: '0-4 hours', guarantee: '30 days', min: 500, max: 1000000 },
    { id: 'yt-shorts', service: 'YouTube Shorts Views', desc: 'Fast Shorts video views for algorithm push.', prices: { NGN: 400, USD: 0.27, GHS: 3.20, KES: 32, ZAR: 4.80 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'yt-shorts-likes', service: 'YouTube Shorts Likes', desc: 'Engagement boost for Shorts content.', prices: { NGN: 550, USD: 0.37, GHS: 4.40, KES: 44, ZAR: 6.60 }, delivery: '0-1 hour', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'yt-favorites', service: 'YouTube Favorites/Saves', desc: 'Video saves to playlists and watch later.', prices: { NGN: 750, USD: 0.50, GHS: 6.00, KES: 60, ZAR: 9.00 }, delivery: '0-2 hours', guarantee: 'Lifetime', min: 50, max: 100000 },
  ],
  tiktok: [
    { id: 'tt-followers', service: 'TikTok Followers', desc: 'Real followers with active profiles. Low drop.', prices: { NGN: 1500, USD: 1.00, GHS: 12.00, KES: 120, ZAR: 18.00 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'tt-views', service: 'TikTok Video Views', desc: 'Instant viral-style views. Triggers algorithm.', prices: { NGN: 120, USD: 0.08, GHS: 0.96, KES: 9.6, ZAR: 1.44 }, delivery: '0-15 mins', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'tt-likes', service: 'TikTok Likes', desc: 'Boost engagement and social proof on videos.', prices: { NGN: 450, USD: 0.30, GHS: 3.60, KES: 36, ZAR: 5.40 }, delivery: '0-1 hour', guarantee: '30 days', min: 100, max: 1000000 },
    { id: 'tt-shares', service: 'TikTok Shares', desc: 'Increase video distribution and reach.', prices: { NGN: 850, USD: 0.57, GHS: 6.80, KES: 68, ZAR: 10.20 }, delivery: '0-2 hours', guarantee: 'Lifetime', min: 50, max: 500000 },
    { id: 'tt-comments', service: 'TikTok Comments', desc: 'Custom comments from real users.', prices: { NGN: 3200, USD: 2.13, GHS: 25.60, KES: 256, ZAR: 38.40 }, delivery: '0-4 hours', guarantee: '30 days', min: 10, max: 5000 },
    { id: 'tt-live', service: 'TikTok Live Views', desc: 'Viewers for live streams. Hourly delivery available.', prices: { NGN: 550, USD: 0.37, GHS: 4.40, KES: 44, ZAR: 6.60 }, delivery: 'Instant', guarantee: 'Per hour', min: 50, max: 10000 },
    { id: 'tt-saves', service: 'TikTok Saves', desc: 'Increase save count for algorithm boost.', prices: { NGN: 700, USD: 0.47, GHS: 5.60, KES: 56, ZAR: 8.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 100000 },
    { id: 'tt-profile-views', service: 'TikTok Profile Views', desc: 'Boost profile visibility and authority.', prices: { NGN: 200, USD: 0.13, GHS: 1.60, KES: 16, ZAR: 2.40 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 500, max: 1000000 },
  ],
  facebook: [
    { id: 'fb-page-likes', service: 'Facebook Page Likes', desc: 'Real page followers from active accounts.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-3 hours', guarantee: '30 days', min: 100, max: 1000000 },
    { id: 'fb-followers', service: 'Facebook Followers', desc: 'Profile and page followers. Country targeting available.', prices: { NGN: 1300, USD: 0.87, GHS: 10.40, KES: 104, ZAR: 15.60 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'fb-post-likes', service: 'Facebook Post Likes', desc: 'Engagement on posts, photos, and links.', prices: { NGN: 550, USD: 0.37, GHS: 4.40, KES: 44, ZAR: 6.60 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'fb-video-views', service: 'Facebook Video Views', desc: 'Real video views. Counts toward monetization.', prices: { NGN: 850, USD: 0.57, GHS: 6.80, KES: 68, ZAR: 10.20 }, delivery: '0-2 hours', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'fb-comments', service: 'Facebook Comments', desc: 'Custom comments from real accounts.', prices: { NGN: 3500, USD: 2.33, GHS: 28.00, KES: 280, ZAR: 42.00 }, delivery: '0-6 hours', guarantee: '30 days', min: 10, max: 5000 },
    { id: 'fb-shares', service: 'Facebook Shares', desc: 'Increase organic reach and social proof.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-3 hours', guarantee: 'Lifetime', min: 50, max: 500000 },
    { id: 'fb-reviews', service: 'Facebook Page Reviews', desc: '5-star page reviews. Custom text available.', prices: { NGN: 4200, USD: 2.80, GHS: 33.60, KES: 336, ZAR: 50.40 }, delivery: '0-12 hours', guarantee: '60 days', min: 5, max: 1000 },
    { id: 'fb-group', service: 'Facebook Group Members', desc: 'Real group members from active profiles.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-6 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'fb-reactions', service: 'Facebook Post Reactions', desc: 'Like, Love, Care, Haha, Wow, Sad, Angry reactions.', prices: { NGN: 480, USD: 0.32, GHS: 3.84, KES: 38.4, ZAR: 5.76 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 500000 },
  ],
  twitter: [
    { id: 'tw-followers', service: 'Twitter/X Followers', desc: 'Real followers with active profiles.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-3 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'tw-likes', service: 'Twitter/X Likes', desc: 'Increase tweet engagement and visibility.', prices: { NGN: 600, USD: 0.40, GHS: 4.80, KES: 48, ZAR: 7.20 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'tw-retweets', service: 'Twitter/X Retweets', desc: 'Boost tweet visibility with real retweets.', prices: { NGN: 950, USD: 0.63, GHS: 7.60, KES: 76, ZAR: 11.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'tw-impressions', service: 'Twitter/X Impressions', desc: 'Increase tweet reach and impressions.', prices: { NGN: 350, USD: 0.23, GHS: 2.80, KES: 28, ZAR: 4.20 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 500, max: 1000000 },
    { id: 'tw-polls', service: 'Twitter/X Poll Votes', desc: 'Custom poll voting. Instant delivery.', prices: { NGN: 750, USD: 0.50, GHS: 6.00, KES: 60, ZAR: 9.00 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 100000 },
    { id: 'tw-video', service: 'Twitter/X Video Views', desc: 'Video view count boost. High retention.', prices: { NGN: 280, USD: 0.19, GHS: 2.24, KES: 22.4, ZAR: 3.36 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 500, max: 1000000 },
    { id: 'tw-space', service: 'Twitter/X Space Listeners', desc: 'Live audio listeners for Spaces.', prices: { NGN: 1200, USD: 0.80, GHS: 9.60, KES: 96, ZAR: 14.40 }, delivery: 'Instant', guarantee: 'Per hour', min: 20, max: 5000 },
    { id: 'tw-quotes', service: 'Twitter/X Quote Tweets', desc: 'Retweets with additional comments.', prices: { NGN: 1600, USD: 1.07, GHS: 12.80, KES: 128, ZAR: 19.20 }, delivery: '0-3 hours', guarantee: '30 days', min: 10, max: 10000 },
  ],
  telegram: [
    { id: 'tg-members', service: 'Telegram Members', desc: 'Real channel/group members. Low drop.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-6 hours', guarantee: '30 days', min: 100, max: 1000000 },
    { id: 'tg-views', service: 'Telegram Post Views', desc: 'Real post impressions. Instant start.', prices: { NGN: 150, USD: 0.10, GHS: 1.20, KES: 12, ZAR: 1.80 }, delivery: '0-30 mins', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'tg-reactions', service: 'Telegram Reactions', desc: 'Custom emoji reactions on posts.', prices: { NGN: 900, USD: 0.60, GHS: 7.20, KES: 72, ZAR: 10.80 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'tg-polls', service: 'Telegram Poll Votes', desc: 'Vote on polls anonymously.', prices: { NGN: 650, USD: 0.43, GHS: 5.20, KES: 52, ZAR: 7.80 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 100000 },
    { id: 'tg-premium', service: 'Telegram Premium Members', desc: 'Premium member adds for channel authority.', prices: { NGN: 3500, USD: 2.33, GHS: 28.00, KES: 280, ZAR: 42.00 }, delivery: '0-12 hours', guarantee: '60 days', min: 50, max: 100000 },
    { id: 'tg-bot', service: 'Telegram Bot Starts', desc: 'Bot start commands for engagement.', prices: { NGN: 450, USD: 0.30, GHS: 3.60, KES: 36, ZAR: 5.40 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 100, max: 1000000 },
    { id: 'tg-comments', service: 'Telegram Comments', desc: 'Post comments from real users.', prices: { NGN: 2800, USD: 1.87, GHS: 22.40, KES: 224, ZAR: 33.60 }, delivery: '0-4 hours', guarantee: '30 days', min: 10, max: 5000 },
  ],
  spotify: [
    { id: 'sp-plays', service: 'Spotify Plays', desc: 'Real plays from active listeners. Algorithm-safe.', prices: { NGN: 350, USD: 0.23, GHS: 2.80, KES: 28, ZAR: 4.20 }, delivery: '0-2 hours', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'sp-followers', service: 'Spotify Followers', desc: 'Artist/profile followers from real accounts.', prices: { NGN: 1600, USD: 1.07, GHS: 12.80, KES: 128, ZAR: 19.20 }, delivery: '0-6 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'sp-monthly', service: 'Spotify Monthly Listeners', desc: 'Increase monthly listener count for algorithm.', prices: { NGN: 2800, USD: 1.87, GHS: 22.40, KES: 224, ZAR: 33.60 }, delivery: '0-24 hours', guarantee: 'Lifetime', min: 500, max: 1000000 },
    { id: 'sp-saves', service: 'Spotify Saves', desc: 'Track saves and library adds.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-3 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'sp-playlist', service: 'Spotify Playlist Placement', desc: 'Add to curated playlists for exposure.', prices: { NGN: 8500, USD: 5.67, GHS: 68.00, KES: 680, ZAR: 102.00 }, delivery: '1-3 days', guarantee: 'Lifetime', min: 1, max: 100 },
    { id: 'sp-presave', service: 'Spotify Pre-Saves', desc: 'Pre-save for new release momentum.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 100000 },
    { id: 'sp-podcast', service: 'Podcast Downloads', desc: 'Episode download boost for podcast ranking.', prices: { NGN: 900, USD: 0.60, GHS: 7.20, KES: 72, ZAR: 10.80 }, delivery: '0-3 hours', guarantee: 'Lifetime', min: 500, max: 1000000 },
  ],
  linkedin: [
    { id: 'li-followers', service: 'LinkedIn Followers', desc: 'Professional network growth. Real profiles.', prices: { NGN: 2500, USD: 1.67, GHS: 20.00, KES: 200, ZAR: 30.00 }, delivery: '0-8 hours', guarantee: '60 days', min: 50, max: 100000 },
    { id: 'li-connections', service: 'LinkedIn Connections', desc: '1st-degree connections from professionals.', prices: { NGN: 3200, USD: 2.13, GHS: 25.60, KES: 256, ZAR: 38.40 }, delivery: '0-12 hours', guarantee: '60 days', min: 20, max: 50000 },
    { id: 'li-post-likes', service: 'LinkedIn Post Likes', desc: 'Engagement on posts and articles.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-3 hours', guarantee: '30 days', min: 20, max: 100000 },
    { id: 'li-profile-views', service: 'LinkedIn Profile Views', desc: 'Increase profile visibility to recruiters.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'li-comments', service: 'LinkedIn Comments', desc: 'Professional engagement on posts.', prices: { NGN: 4500, USD: 3.00, GHS: 36.00, KES: 360, ZAR: 54.00 }, delivery: '0-6 hours', guarantee: '30 days', min: 5, max: 5000 },
    { id: 'li-articles', service: 'LinkedIn Article Views', desc: 'Boost article readership and authority.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-4 hours', guarantee: 'Lifetime', min: 100, max: 500000 },
    { id: 'li-recommend', service: 'LinkedIn Recommendations', desc: 'Skill endorsements and recommendations.', prices: { NGN: 5800, USD: 3.87, GHS: 46.40, KES: 464, ZAR: 69.60 }, delivery: '0-24 hours', guarantee: '90 days', min: 5, max: 1000 },
    { id: 'li-company', service: 'LinkedIn Company Followers', desc: 'Business page growth and authority.', prices: { NGN: 3800, USD: 2.53, GHS: 30.40, KES: 304, ZAR: 45.60 }, delivery: '0-12 hours', guarantee: '60 days', min: 50, max: 200000 },
  ],
}

const tabs = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'spotify', label: 'Spotify' },
  { id: 'linkedin', label: 'LinkedIn' },
]

function OrderForm({ service, currency, onBack }) {
  const [link, setLink] = useState('')
  const [quantity, setQuantity] = useState(service.min)
  const [error, setError] = useState('')

  const currentCurrency = currencies.find(c => c.code === currency)
  const pricePer1000 = service.prices[currency]
  const totalPrice = ((quantity / 1000) * pricePer1000).toFixed(2)

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value) || service.min
    if (val < service.min) {
      setError(`Minimum order is ${service.min.toLocaleString()}`)
      setQuantity(service.min)
    } else if (val > service.max) {
      setError(`Maximum order is ${service.max.toLocaleString()}`)
      setQuantity(service.max)
    } else {
      setError('')
      setQuantity(val)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!link.trim()) {
      setError('Please enter a valid link')
      return
    }
    if (quantity < service.min || quantity > service.max) {
      setError(`Quantity must be between ${service.min} and ${service.max}`)
      return
    }
    alert(`Order placed!\n\nService: ${service.service}\nLink: ${link}\nQuantity: ${quantity.toLocaleString()}\nTotal: ${currentCurrency.symbol}${totalPrice} ${currency}\n\nProceed to payment to complete your order.`)
  }

  return (
    <motion.div
      className="order-form"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
    >
      <button className="back-btn" onClick={onBack}>
        &larr; Back to services
      </button>
      <div className="order-service-info">
        <h3>{service.service}</h3>
        <p>{service.desc}</p>
        <div className="order-meta">
          <span className="meta-badge delivery">{service.delivery}</span>
          <span className="meta-badge guarantee">{service.guarantee}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile / Post Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://instagram.com/yourusername"
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity ({service.min.toLocaleString()} - {service.max.toLocaleString()})</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={service.min}
            max={service.max}
            step={service.min}
          />
          <div className="quantity-presets">
            {[service.min, service.min * 10, service.min * 100, service.max].filter((v, i, a) => v <= service.max && a.indexOf(v) === i).map(val => (
              <button key={val} type="button" className="preset-btn" onClick={() => { setQuantity(val); setError('') }}>
                {val.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="order-summary">
          <div className="summary-row">
            <span>Price per 1000:</span>
            <span>{currentCurrency.symbol}{pricePer1000.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Quantity:</span>
            <span>{quantity.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{currentCurrency.symbol}{totalPrice} {currency}</span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">
          Place Order — {currentCurrency.symbol}{totalPrice} {currency}
        </button>
      </form>
    </motion.div>
  )
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('instagram')
  const [currency, setCurrency] = useState('NGN')
  const [selectedService, setSelectedService] = useState(null)

  const currentCurrency = currencies.find(c => c.code === currency)

  const formatPrice = (price) => {
    if (price >= 1) return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    return price.toFixed(2)
  }

  if (selectedService) {
    return (
      <section id="pricing" className="pricing">
        <div className="container">
          <OrderForm
            service={selectedService}
            currency={currency}
            onBack={() => setSelectedService(null)}
          />
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3 }}
        >
          <span className="section-tag">Pricing Plans</span>
          <h2>Select a Service & Place Your Order</h2>
          <p>Wholesale rates in 5 currencies. Pay via Paystack. Instant delivery.</p>
        </motion.div>

        <motion.div
          className="currency-selector"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <span className="currency-label">Currency:</span>
          {currencies.map((curr) => (
            <button
              key={curr.code}
              className={`currency-btn ${currency === curr.code ? 'active' : ''}`}
              onClick={() => setCurrency(curr.code)}
            >
              {curr.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="pricing-tabs"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="pricing-table-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + currency}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Per 1000</th>
                    <th>Delivery</th>
                    <th>Guarantee</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData[activeTab].map((row) => (
                    <tr key={row.id}>
                      <td><strong>{row.service}</strong></td>
                      <td className="desc">{row.desc}</td>
                      <td className="price">{currentCurrency.symbol}{formatPrice(row.prices[currency])}</td>
                      <td className="delivery">{row.delivery}</td>
                      <td className="guarantee">{row.guarantee}</td>
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => setSelectedService(row)}>
                          Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
