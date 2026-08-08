import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero({ onOpenModal }) {
  return (
    <section className="hero sheen">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            className="badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Trusted by 188,888+ Users Worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Grow Your Social Media <span className="gradient-text">Instantly</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            The cheapest and most reliable SMM panel for Instagram, YouTube, TikTok, Facebook, Twitter/X and 10+ platforms. Real results, fast delivery, lifetime guarantee.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <button className="btn btn-primary btn-lg" onClick={() => onOpenModal('signup')}>
              Start Growing Today
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href="#services" className="btn btn-outline btn-lg">View Services</a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="stat">
              <span className="stat-number">5 Crore+</span>
              <span className="stat-label">Orders Delivered</span>
            </div>
            <div className="stat">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Services Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.8%</span>
              <span className="stat-label">Delivery Rate</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
