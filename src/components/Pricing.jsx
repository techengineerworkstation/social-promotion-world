import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Pricing.css'

const pricingData = {
  instagram: [
    { service: "Instagram Real Followers", desc: "Active followers, low drop rate", price: "₦1,200", delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Instagram Likes", desc: "Real-looking likes from active users", price: "₦350", delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Instagram Reels Views", desc: "High-quality reel views, fast start", price: "₦180", delivery: "0-30 mins", guarantee: "Lifetime" },
    { service: "Instagram Story Views", desc: "Instant story viewers", price: "₦250", delivery: "0-15 mins", guarantee: "Lifetime" },
    { service: "Instagram Impressions", desc: "Boost post visibility & reach", price: "₦150", delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Instagram Comments", desc: "Custom comments, real accounts", price: "₦2,800", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Instagram Saves", desc: "Increase post save count", price: "₦450", delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Instagram Profile Visits", desc: "Boost profile visibility", price: "₦220", delivery: "0-1 hour", guarantee: "Lifetime" },
  ],
  youtube: [
    { service: "YouTube Views (High Retention)", desc: "Monetizable views, 40%+ retention", price: "₦1,800", delivery: "0-4 hours", guarantee: "Lifetime" },
    { service: "YouTube Subscribers", desc: "Real subscribers, low drop", price: "₦3,500", delivery: "0-12 hours", guarantee: "60 days" },
    { service: "YouTube Watch Time (Hours)", desc: "Real watch time for monetization", price: "₦5,200", delivery: "0-24 hours", guarantee: "Lifetime" },
    { service: "YouTube Likes", desc: "Increase engagement signal", price: "₦650", delivery: "0-2 hours", guarantee: "30 days" },
    { service: "YouTube Comments", desc: "Custom comments from real users", price: "₦4,500", delivery: "0-6 hours", guarantee: "30 days" },
    { service: "YouTube Shares", desc: "Boost social proof & reach", price: "₦1,100", delivery: "0-3 hours", guarantee: "Lifetime" },
    { service: "YouTube Impressions", desc: "Increase CTR & visibility", price: "₦900", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "YouTube Shorts Views", desc: "Fast Shorts video views", price: "₦400", delivery: "0-1 hour", guarantee: "Lifetime" },
  ],
  tiktok: [
    { service: "TikTok Followers", desc: "Real followers, active profiles", price: "₦1,500", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "TikTok Video Views", desc: "Instant viral-style views", price: "₦120", delivery: "0-15 mins", guarantee: "Lifetime" },
    { service: "TikTok Likes", desc: "Boost engagement on videos", price: "₦450", delivery: "0-1 hour", guarantee: "30 days" },
    { service: "TikTok Shares", desc: "Increase video distribution", price: "₦850", delivery: "0-2 hours", guarantee: "Lifetime" },
    { service: "TikTok Comments", desc: "Custom comments from real users", price: "₦3,200", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "TikTok Live Views", desc: "Viewers for live streams", price: "₦550", delivery: "Instant", guarantee: "Per hour" },
    { service: "TikTok Saves", desc: "Increase save count", price: "₦700", delivery: "0-2 hours", guarantee: "30 days" },
    { service: "TikTok Profile Views", desc: "Boost profile visibility", price: "₦200", delivery: "0-1 hour", guarantee: "Lifetime" },
  ],
  facebook: [
    { service: "Facebook Page Likes", desc: "Real page followers", price: "₦1,100", delivery: "0-3 hours", guarantee: "30 days" },
    { service: "Facebook Followers", desc: "Profile & page followers", price: "₦1,300", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Facebook Post Likes", desc: "Engagement on posts", price: "₦550", delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Facebook Video Views", desc: "Real video views", price: "₦850", delivery: "0-2 hours", guarantee: "Lifetime" },
    { service: "Facebook Comments", desc: "Custom comments", price: "₦3,500", delivery: "0-6 hours", guarantee: "30 days" },
    { service: "Facebook Shares", desc: "Increase organic reach", price: "₦1,400", delivery: "0-3 hours", guarantee: "Lifetime" },
    { service: "Facebook Reviews/Ratings", desc: "5-star page reviews", price: "₦4,200", delivery: "0-12 hours", guarantee: "60 days" },
    { service: "Facebook Group Members", desc: "Real group members", price: "₦1,800", delivery: "0-6 hours", guarantee: "30 days" },
  ],
  twitter: [
    { service: "Twitter/X Followers", desc: "Real followers, active profiles", price: "₦1,400", delivery: "0-3 hours", guarantee: "30 days" },
    { service: "Twitter/X Likes", desc: "Increase tweet engagement", price: "₦600", delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Twitter/X Retweets", desc: "Boost tweet visibility", price: "₦950", delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Twitter/X Impressions", desc: "Increase tweet reach", price: "₦350", delivery: "0-1 hour", guarantee: "Lifetime" },
    { service: "Twitter/X Polls Votes", desc: "Custom poll voting", price: "₦750", delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Twitter/X Video Views", desc: "Video view count boost", price: "₦280", delivery: "0-1 hour", guarantee: "Lifetime" },
    { service: "Twitter/X Space Listeners", desc: "Live audio listeners", price: "₦1,200", delivery: "Instant", guarantee: "Per hour" },
    { service: "Twitter/X Quote Tweets", desc: "Retweets with comments", price: "₦1,600", delivery: "0-3 hours", guarantee: "30 days" },
  ],
  telegram: [
    { service: "Telegram Members", desc: "Real channel/group members", price: "₦1,800", delivery: "0-6 hours", guarantee: "30 days" },
    { service: "Telegram Post Views", desc: "Real post impressions", price: "₦150", delivery: "0-30 mins", guarantee: "Lifetime" },
    { service: "Telegram Reactions", desc: "Custom emoji reactions", price: "₦900", delivery: "0-2 hours", guarantee: "30 days" },
    { service: "Telegram Poll Votes", desc: "Vote on polls anonymously", price: "₦650", delivery: "0-1 hour", guarantee: "30 days" },
    { service: "Telegram Premium Members", desc: "Premium member adds", price: "₦3,500", delivery: "0-12 hours", guarantee: "60 days" },
    { service: "Telegram Bot Starts", desc: "Bot start commands", price: "₦450", delivery: "0-1 hour", guarantee: "Lifetime" },
    { service: "Telegram Comments", desc: "Post comments from real users", price: "₦2,800", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Telegram Channel Subscribers", desc: "Channel growth boost", price: "₦2,200", delivery: "0-8 hours", guarantee: "30 days" },
  ],
  spotify: [
    { service: "Spotify Plays", desc: "Real plays from listeners", price: "₦350", delivery: "0-2 hours", guarantee: "Lifetime" },
    { service: "Spotify Followers", desc: "Artist/profile followers", price: "₦1,600", delivery: "0-6 hours", guarantee: "30 days" },
    { service: "Spotify Monthly Listeners", desc: "Increase monthly listeners", price: "₦2,800", delivery: "0-24 hours", guarantee: "Lifetime" },
    { service: "Spotify Saves", desc: "Track saves & library adds", price: "₦1,100", delivery: "0-3 hours", guarantee: "30 days" },
    { service: "Spotify Playlist Placement", desc: "Add to curated playlists", price: "₦8,500", delivery: "1-3 days", guarantee: "Lifetime" },
    { service: "Spotify Pre-Saves", desc: "Pre-save for new releases", price: "₦1,400", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "Podcast Downloads", desc: "Episode download boost", price: "₦900", delivery: "0-3 hours", guarantee: "Lifetime" },
    { service: "Spotify Shares", desc: "Track & playlist shares", price: "₦2,200", delivery: "0-6 hours", guarantee: "30 days" },
  ],
  linkedin: [
    { service: "LinkedIn Followers", desc: "Professional network growth", price: "₦2,500", delivery: "0-8 hours", guarantee: "60 days" },
    { service: "LinkedIn Connections", desc: "1st-degree connections", price: "₦3,200", delivery: "0-12 hours", guarantee: "60 days" },
    { service: "LinkedIn Post Likes", desc: "Engagement on posts", price: "₦1,800", delivery: "0-3 hours", guarantee: "30 days" },
    { service: "LinkedIn Profile Views", desc: "Increase profile visibility", price: "₦1,100", delivery: "0-4 hours", guarantee: "30 days" },
    { service: "LinkedIn Comments", desc: "Professional engagement", price: "₦4,500", delivery: "0-6 hours", guarantee: "30 days" },
    { service: "LinkedIn Article Views", desc: "Boost article readership", price: "₦1,400", delivery: "0-4 hours", guarantee: "Lifetime" },
    { service: "LinkedIn Recommendations", desc: "Skill endorsements & recs", price: "₦5,800", delivery: "0-24 hours", guarantee: "90 days" },
    { service: "LinkedIn Company Followers", desc: "Business page growth", price: "₦3,800", delivery: "0-12 hours", guarantee: "60 days" },
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
          <h2>Transparent Pricing in Naira</h2>
          <p>Wholesale rates with no hidden fees. Start with as little as ₦120 and scale as you grow.</p>
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
              key={activeTab}
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
                    <td className="price">{row.price}</td>
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
