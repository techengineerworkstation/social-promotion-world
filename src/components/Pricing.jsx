import React, { useState } from 'react'
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
    { service: "Instagram Real Followers", desc: "Active followers, low drop rate", prices: { NGN: "1,200", USD: "0.80", GHS: "9.60", KES: "96", ZAR: "14.40" }, delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Instagram Likes", desc: "Real-looking likes from active users", prices: { NGN: "350", USD: "0.23", GHS: "2.80", KES: "28", ZAR: "4.20" }, delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Instagram Reels Views", desc: "High-quality reel views, fast start", prices: { NGN: "180", USD: "0.12", GHS: "1.44", KES: "14.4", ZAR: "2.16" }, delivery: "0-30 mins", guarantee: "Lifetime" },
    { service: "Instagram Story Views", desc: "Instant story viewers", prices: { NGN: "250", USD: "0.17", GHS: "2.00", KES: "20", ZAR: "3.00" }, delivery: "0-15 mins", guarantee: "Lifetime" },
    { service: "Instagram Impressions", desc: "Boost post visibility & reach", prices: { NGN: "150", USD: "0.10", GHS: "1.20", KES: "12", ZAR: "1.80" }, delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Instagram Comments", desc: "Custom comments, real accounts", prices: { NGN: "2,800", USD: "1.87", GHS: "22.40", KES: "224", ZAR: "33.60" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Instagram Saves", desc: "Increase post save count", prices: { NGN: "450", USD: "0.30", GHS: "3.60", KES: "36", ZAR: "5.40" }, delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Instagram Profile Visits", desc: "Boost profile visibility", prices: { NGN: "220", USD: "0.15", GHS: "1.76", KES: "17.6", ZAR: "2.64" }, delivery: "0-1 hour", guarantee: "Lifetime" },
  ],
  youtube: [
    { service: "YouTube Views (High Retention)", desc: "Monetizable views, 40%+ retention", prices: { NGN: "1,800", USD: "1.20", GHS: "14.40", KES: "144", ZAR: "21.60" }, delivery: "0-4 hours", guarantee: "Lifetime" },
    { service: "YouTube Subscribers", desc: "Real subscribers, low drop", prices: { NGN: "3,500", USD: "2.33", GHS: "28.00", KES: "280", ZAR: "42.00" }, delivery: "0-12 hours", guarantee: "60 days" },
    { service: "YouTube Watch Time (Hours)", desc: "Real watch time for monetization", prices: { NGN: "5,200", USD: "3.47", GHS: "41.60", KES: "416", ZAR: "62.40" }, delivery: "0-24 hours", guarantee: "Lifetime" },
    { service: "YouTube Likes", desc: "Increase engagement signal", prices: { NGN: "650", USD: "0.43", GHS: "5.20", KES: "52", ZAR: "7.80" }, delivery: "0-2 hours", guarantee: "30 days" },
    { service: "YouTube Comments", desc: "Custom comments from real users", prices: { NGN: "4,500", USD: "3.00", GHS: "36.00", KES: "360", ZAR: "54.00" }, delivery: "0-6 hours", guarantee: "30 days" },
    { service: "YouTube Shares", desc: "Boost social proof & reach", prices: { NGN: "1,100", USD: "0.73", GHS: "8.80", KES: "88", ZAR: "13.20" }, delivery: "0-3 hours", guarantee: "Lifetime" },
    { service: "YouTube Impressions", desc: "Increase CTR & visibility", prices: { NGN: "900", USD: "0.60", GHS: "7.20", KES: "72", ZAR: "10.80" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "YouTube Shorts Views", desc: "Fast Shorts video views", prices: { NGN: "400", USD: "0.27", GHS: "3.20", KES: "32", ZAR: "4.80" }, delivery: "0-1 hour", guarantee: "Lifetime" },
  ],
  tiktok: [
    { service: "TikTok Followers", desc: "Real followers, active profiles", prices: { NGN: "1,500", USD: "1.00", GHS: "12.00", KES: "120", ZAR: "18.00" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "TikTok Video Views", desc: "Instant viral-style views", prices: { NGN: "120", USD: "0.08", GHS: "0.96", KES: "9.6", ZAR: "1.44" }, delivery: "0-15 mins", guarantee: "Lifetime" },
    { service: "TikTok Likes", desc: "Boost engagement on videos", prices: { NGN: "450", USD: "0.30", GHS: "3.60", KES: "36", ZAR: "5.40" }, delivery: "0-1 hour", guarantee: "30 days" },
    { service: "TikTok Shares", desc: "Increase video distribution", prices: { NGN: "850", USD: "0.57", GHS: "6.80", KES: "68", ZAR: "10.20" }, delivery: "0-2 hours", guarantee: "Lifetime" },
    { service: "TikTok Comments", desc: "Custom comments from real users", prices: { NGN: "3,200", USD: "2.13", GHS: "25.60", KES: "256", ZAR: "38.40" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "TikTok Live Views", desc: "Viewers for live streams", prices: { NGN: "550", USD: "0.37", GHS: "4.40", KES: "44", ZAR: "6.60" }, delivery: "Instant", guarantee: "Per hour" },
    { service: "TikTok Saves", desc: "Increase save count", prices: { NGN: "700", USD: "0.47", GHS: "5.60", KES: "56", ZAR: "8.40" }, delivery: "0-2 hours", guarantee: "30 days" },
    { service: "TikTok Profile Views", desc: "Boost profile visibility", prices: { NGN: "200", USD: "0.13", GHS: "1.60", KES: "16", ZAR: "2.40" }, delivery: "0-1 hour", guarantee: "Lifetime" },
  ],
  facebook: [
    { service: "Facebook Page Likes", desc: "Real page followers", prices: { NGN: "1,100", USD: "0.73", GHS: "8.80", KES: "88", ZAR: "13.20" }, delivery: "0-3 hours", guarantee: "30 days" },
    { service: "Facebook Followers", desc: "Profile & page followers", prices: { NGN: "1,300", USD: "0.87", GHS: "10.40", KES: "104", ZAR: "15.60" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Facebook Post Likes", desc: "Engagement on posts", prices: { NGN: "550", USD: "0.37", GHS: "4.40", KES: "44", ZAR: "6.60" }, delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Facebook Video Views", desc: "Real video views", prices: { NGN: "850", USD: "0.57", GHS: "6.80", KES: "68", ZAR: "10.20" }, delivery: "0-2 hours", guarantee: "Lifetime" },
    { service: "Facebook Comments", desc: "Custom comments", prices: { NGN: "3,500", USD: "2.33", GHS: "28.00", KES: "280", ZAR: "42.00" }, delivery: "0-6 hours", guarantee: "30 days" },
    { service: "Facebook Shares", desc: "Increase organic reach", prices: { NGN: "1,400", USD: "0.93", GHS: "11.20", KES: "112", ZAR: "16.80" }, delivery: "0-3 hours", guarantee: "Lifetime" },
    { service: "Facebook Reviews/Ratings", desc: "5-star page reviews", prices: { NGN: "4,200", USD: "2.80", GHS: "33.60", KES: "336", ZAR: "50.40" }, delivery: "0-12 hours", guarantee: "60 days" },
    { service: "Facebook Group Members", desc: "Real group members", prices: { NGN: "1,800", USD: "1.20", GHS: "14.40", KES: "144", ZAR: "21.60" }, delivery: "0-6 hours", guarantee: "30 days" },
  ],
  twitter: [
    { service: "Twitter/X Followers", desc: "Real followers, active profiles", prices: { NGN: "1,400", USD: "0.93", GHS: "11.20", KES: "112", ZAR: "16.80" }, delivery: "0-3 hours", guarantee: "30 days" },
    { service: "Twitter/X Likes", desc: "Increase tweet engagement", prices: { NGN: "600", USD: "0.40", GHS: "4.80", KES: "48", ZAR: "7.20" }, delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Twitter/X Retweets", desc: "Boost tweet visibility", prices: { NGN: "950", USD: "0.63", GHS: "7.60", KES: "76", ZAR: "11.40" }, delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Twitter/X Impressions", desc: "Increase tweet reach", prices: { NGN: "350", USD: "0.23", GHS: "2.80", KES: "28", ZAR: "4.20" }, delivery: "0-1 hour", guarantee: "Lifetime" },
    { service: "Twitter/X Polls Votes", desc: "Custom poll voting", prices: { NGN: "750", USD: "0.50", GHS: "6.00", KES: "60", ZAR: "9.00" }, delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Twitter/X Video Views", desc: "Video view count boost", prices: { NGN: "280", USD: "0.19", GHS: "2.24", KES: "22.4", ZAR: "3.36" }, delivery: "0-1 hour", guarantee: "Lifetime" },
    { service: "Twitter/X Space Listeners", desc: "Live audio listeners", prices: { NGN: "1,200", USD: "0.80", GHS: "9.60", KES: "96", ZAR: "14.40" }, delivery: "Instant", guarantee: "Per hour" },
    { service: "Twitter/X Quote Tweets", desc: "Retweets with comments", prices: { NGN: "1,600", USD: "1.07", GHS: "12.80", KES: "128", ZAR: "19.20" }, delivery: "0-3 hours", guarantee: "30 days" },
  ],
  telegram: [
    { service: "Telegram Members", desc: "Real channel/group members", prices: { NGN: "1,800", USD: "1.20", GHS: "14.40", KES: "144", ZAR: "21.60" }, delivery: "0-6 hours", guarantee: "30 days" },
    { service: "Telegram Post Views", desc: "Real post impressions", prices: { NGN: "150", USD: "0.10", GHS: "1.20", KES: "12", ZAR: "1.80" }, delivery: "0-30 mins", guarantee: "Lifetime" },
    { service: "Telegram Reactions", desc: "Custom emoji reactions", prices: { NGN: "900", USD: "0.60", GHS: "7.20", KES: "72", ZAR: "10.80" }, delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Telegram Poll Votes", desc: "Vote on polls anonymously", prices: { NGN: "650", USD: "0.43", GHS: "5.20", KES: "52", ZAR: "7.80" }, delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Telegram Premium Members", desc: "Premium member adds", prices: { NGN: "3,500", USD: "2.33", GHS: "28.00", KES: "280", ZAR: "42.00" }, delivery: "0-12 hours", guarantee: "60 days" },
    { service: "Telegram Bot Starts", desc: "Bot start commands", prices: { NGN: "450", USD: "0.30", GHS: "3.60", KES: "36", ZAR: "5.40" }, delivery: "0-1 hour", guarantee: "Lifetime" },
    { service: "Telegram Comments", desc: "Post comments from real users", prices: { NGN: "2,800", USD: "1.87", GHS: "22.40", KES: "224", ZAR: "33.60" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Telegram Channel Subscribers", desc: "Channel growth boost", prices: { NGN: "2,200", USD: "1.47", GHS: "17.60", KES: "176", ZAR: "26.40" }, delivery: "0-8 hours", guarantee: "30 days" },
  ],
  spotify: [
    { service: "Spotify Plays", desc: "Real plays from listeners", prices: { NGN: "350", USD: "0.23", GHS: "2.80", KES: "28", ZAR: "4.20" }, delivery: "0-2 hours", guarantee: "Lifetime" },
    { service: "Spotify Followers", desc: "Artist/profile followers", prices: { NGN: "1,600", USD: "1.07", GHS: "12.80", KES: "128", ZAR: "19.20" }, delivery: "0-6 hours", guarantee: "30 days" },
    { service: "Spotify Monthly Listeners", desc: "Increase monthly listeners", prices: { NGN: "2,800", USD: "1.87", GHS: "22.40", KES: "224", ZAR: "33.60" }, delivery: "0-24 hours", guarantee: "Lifetime" },
    { service: "Spotify Saves", desc: "Track saves & library adds", prices: { NGN: "1,100", USD: "0.73", GHS: "8.80", KES: "88", ZAR: "13.20" }, delivery: "0-3 hours", guarantee: "30 days" },
    { service: "Spotify Playlist Placement", desc: "Add to curated playlists", prices: { NGN: "8,500", USD: "5.67", GHS: "68.00", KES: "680", ZAR: "102.00" }, delivery: "1-3 days", guarantee: "Lifetime" },
    { service: "Spotify Pre-Saves", desc: "Pre-save for new releases", prices: { NGN: "1,400", USD: "0.93", GHS: "11.20", KES: "112", ZAR: "16.80" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Podcast Downloads", desc: "Episode download boost", prices: { NGN: "900", USD: "0.60", GHS: "7.20", KES: "72", ZAR: "10.80" }, delivery: "0-3 hours", guarantee: "Lifetime" },
    { service: "Spotify Shares", desc: "Track & playlist shares", prices: { NGN: "2,200", USD: "1.47", GHS: "17.60", KES: "176", ZAR: "26.40" }, delivery: "0-6 hours", guarantee: "30 days" },
  ],
  linkedin: [
    { service: "LinkedIn Followers", desc: "Professional network growth", prices: { NGN: "2,500", USD: "1.67", GHS: "20.00", KES: "200", ZAR: "30.00" }, delivery: "0-8 hours", guarantee: "60 days" },
    { service: "LinkedIn Connections", desc: "1st-degree connections", prices: { NGN: "3,200", USD: "2.13", GHS: "25.60", KES: "256", ZAR: "38.40" }, delivery: "0-12 hours", guarantee: "60 days" },
    { service: "LinkedIn Post Likes", desc: "Engagement on posts", prices: { NGN: "1,800", USD: "1.20", GHS: "14.40", KES: "144", ZAR: "21.60" }, delivery: "0-3 hours", guarantee: "30 days" },
    { service: "LinkedIn Profile Views", desc: "Increase profile visibility", prices: { NGN: "1,100", USD: "0.73", GHS: "8.80", KES: "88", ZAR: "13.20" }, delivery: "0-4 hours", guarantee: "30 days" },
    { service: "LinkedIn Comments", desc: "Professional engagement", prices: { NGN: "4,500", USD: "3.00", GHS: "36.00", KES: "360", ZAR: "54.00" }, delivery: "0-6 hours", guarantee: "30 days" },
    { service: "LinkedIn Article Views", desc: "Boost article readership", prices: { NGN: "1,400", USD: "0.93", GHS: "11.20", KES: "112", ZAR: "16.80" }, delivery: "0-4 hours", guarantee: "Lifetime" },
    { service: "LinkedIn Recommendations", desc: "Skill endorsements & recs", prices: { NGN: "5,800", USD: "3.87", GHS: "46.40", KES: "464", ZAR: "69.60" }, delivery: "0-24 hours", guarantee: "90 days" },
    { service: "LinkedIn Company Followers", desc: "Business page growth", prices: { NGN: "3,800", USD: "2.53", GHS: "30.40", KES: "304", ZAR: "45.60" }, delivery: "0-12 hours", guarantee: "60 days" },
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

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('instagram')
  const [currency, setCurrency] = useState('NGN')

  const currentCurrency = currencies.find(c => c.code === currency)

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag">Pricing Plans</span>
          <h2>Transparent Pricing — Pay in Your Currency</h2>
          <p>Wholesale rates with no hidden fees. Paystack supports NGN, USD, GHS, KES & ZAR.</p>
        </motion.div>

        <motion.div
          className="currency-selector"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
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
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.table
              key={activeTab + currency}
              className="pricing-table"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Description</th>
                  <th>Per 1000</th>
                  <th>Delivery</th>
                  <th>Guarantee</th>
                </tr>
              </thead>
              <tbody>
                {pricingData[activeTab].map((row, idx) => (
                  <motion.tr
                    key={row.service}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <td><strong>{row.service}</strong></td>
                    <td>{row.desc}</td>
                    <td className="price">{currentCurrency.symbol}{row.prices[currency]}</td>
                    <td className="delivery">{row.delivery}</td>
                    <td className="guarantee">{row.guarantee}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
