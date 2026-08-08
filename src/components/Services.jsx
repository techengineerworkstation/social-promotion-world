import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Services.css'

const services = [
  {
    id: 'instagram',
    icon: 'instagram',
    title: 'Instagram Growth',
    description: 'Real followers, likes, Reels views, story views & impressions with targeted audience options.',
    features: ['Real & Active Followers', 'Reels & Story Views', 'Targeted by Country/Gender', 'Auto-Refill Guarantee'],
    color: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    details: {
      overview: 'Boost your Instagram presence with real, active followers and engagement. Our Instagram services are designed for creators, influencers, and businesses looking to grow their reach organically.',
      startingFrom: 'From ₦350 per 1000',
      delivery: 'Instant to 2 hours',
      popular: ['Real Followers', 'Reels Views', 'Story Views', 'Likes & Comments'],
    }
  },
  {
    id: 'youtube',
    icon: 'youtube',
    title: 'YouTube Boost',
    description: 'Views, watch-time, subscribers, likes & impressions for monetization growth.',
    features: ['High Retention Views', 'Watch Time Hours', 'Native Ads & AdWords', 'Lifetime Guarantee'],
    color: 'linear-gradient(135deg, #ff0000, #cc0000)',
    details: {
      overview: 'Accelerate your YouTube monetization with high-retention views and real subscribers. Perfect for creators ready to hit monetization thresholds.',
      startingFrom: 'From ₦500 per 1000',
      delivery: 'Instant to 24 hours',
      popular: ['Video Views', 'Watch Time', 'Subscribers', 'Likes & Comments'],
    }
  },
  {
    id: 'tiktok',
    icon: 'tiktok',
    title: 'TikTok & Reels',
    description: 'Followers, likes, views, shares & Reels promotions for viral growth.',
    features: ['Viral Video Views', 'Real Followers & Likes', 'Shares & Comments', 'Instant Delivery'],
    color: 'linear-gradient(135deg, #000000, #25f4ee, #fe2c55)',
    details: {
      overview: 'TikTok rewards momentum. Our services give your content the initial push needed to trigger the algorithm and reach new audiences.',
      startingFrom: 'From ₦180 per 1000',
      delivery: 'Instant to 1 hour',
      popular: ['Video Views', 'Followers', 'Likes', 'Shares'],
    }
  },
  {
    id: 'facebook',
    icon: 'facebook',
    title: 'Facebook Growth',
    description: 'Page likes, followers, post engagement, video views & reviews for brands.',
    features: ['Page Likes & Followers', 'Post Engagement', 'Video Views & Shares', 'Country Targeting'],
    color: 'linear-gradient(135deg, #1877f2, #42a5f5)',
    details: {
      overview: 'Build your brand authority on Facebook with real page followers, post engagement, and 5-star reviews that drive organic reach.',
      startingFrom: 'From ₦350 per 1000',
      delivery: 'Instant to 6 hours',
      popular: ['Page Likes', 'Followers', 'Video Views', 'Reviews'],
    }
  },
  {
    id: 'twitter',
    icon: 'twitter',
    title: 'Twitter / X Boost',
    description: 'Followers, likes, retweets, reposts & impressions for maximum reach.',
    features: ['Real Followers', 'Retweets & Likes', 'Impressions & Polls', 'Space Listeners'],
    color: 'linear-gradient(135deg, #000000, #1d9bf0)',
    details: {
      overview: 'Amplify your voice on Twitter/X with real followers and engagement. Perfect for influencers, brands, and thought leaders.',
      startingFrom: 'From ₦420 per 1000',
      delivery: 'Instant to 3 hours',
      popular: ['Followers', 'Retweets', 'Likes', 'Impressions'],
    }
  },
  {
    id: 'telegram',
    icon: 'telegram',
    title: 'Telegram Growth',
    description: 'Channel members, post views, reactions, poll votes & premium members.',
    features: ['Real Group Members', 'Post Views & Reactions', 'Premium Members', 'Bot Starts'],
    color: 'linear-gradient(135deg, #0088cc, #229ed9)',
    details: {
      overview: 'Grow your Telegram channel or group with real, active members. Premium members and bot starts available for advanced growth.',
      startingFrom: 'From ₦230 per 1000',
      delivery: 'Instant to 6 hours',
      popular: ['Members', 'Post Views', 'Reactions', 'Premium Members'],
    }
  },
  {
    id: 'spotify',
    icon: 'spotify',
    title: 'Spotify & Music',
    description: 'Plays, followers, saves, playlist boosts & monthly listener growth.',
    features: ['Real Plays & Streams', 'Followers & Saves', 'Playlist Placements', 'Podcast Growth'],
    color: 'linear-gradient(135deg, #1db954, #1ed760)',
    details: {
      overview: 'Boost your Spotify presence with real plays and followers. Get playlist placements and increase your monthly listeners for algorithm success.',
      startingFrom: 'From ₦550 per 1000',
      delivery: 'Instant to 24 hours',
      popular: ['Plays', 'Followers', 'Monthly Listeners', 'Saves'],
    }
  },
  {
    id: 'linkedin',
    icon: 'linkedin',
    title: 'LinkedIn Authority',
    description: 'Followers, profile views, post engagement & article views for professionals.',
    features: ['Profile Visitors', 'Connection Growth', 'Post Engagement', 'Recommendations'],
    color: 'linear-gradient(135deg, #0077b5, #00a0dc)',
    details: {
      overview: 'Establish your professional authority on LinkedIn with real connections, profile views, and engagement that builds credibility.',
      startingFrom: 'From ₦800 per 1000',
      delivery: 'Instant to 12 hours',
      popular: ['Connections', 'Followers', 'Profile Views', 'Post Likes'],
    }
  },
]

function getServiceIcon(type) {
  const icons = {
    instagram: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    youtube: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    tiktok: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
    facebook: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    twitter: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    telegram: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
    spotify: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
    linkedin: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  }
  return icons[type]
}

function ServiceDetail({ service, onClose }) {
  return (
    <motion.div
      className="service-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="service-detail"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="detail-close" onClick={onClose}>&times;</button>
        <div className="detail-header">
          <div className="detail-icon" style={{ background: service.color }}>
            {getServiceIcon(service.icon)}
          </div>
          <div>
            <h2>{service.title}</h2>
            <p className="detail-price">{service.details.startingFrom}</p>
          </div>
        </div>
        <p className="detail-overview">{service.details.overview}</p>
        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">Delivery Time</span>
            <span className="meta-value">{service.details.delivery}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Refill Guarantee</span>
            <span className="meta-value">Yes</span>
          </div>
        </div>
        <h4>Popular Services</h4>
        <div className="detail-popular">
          {service.details.popular.map((item) => (
            <span key={item} className="popular-tag">{item}</span>
          ))}
        </div>
        <a href="#pricing" className="btn btn-primary btn-block" onClick={onClose}>
          View Pricing & Order
        </a>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <section id="services" className="services">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag">Our Services</span>
          <h2>All-in-One Social Media Growth Platform</h2>
          <p>Access 10,000+ high-quality services across all major platforms with instant delivery and guaranteed results.</p>
        </motion.div>

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="service-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedService(service)}
            >
              <div className="service-icon" style={{ background: service.color }}>
                {getServiceIcon(service.icon)}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((f) => (
                  <li key={f}>
                    <span className="check">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <span className="view-details">View Details &rarr;</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedService && (
        <ServiceDetail service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  )
}
