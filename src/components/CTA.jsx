import React from 'react'
import { motion } from 'framer-motion'
import './CTA.css'

export default function CTA({ onOpenModal }) {
  return (
    <section className="cta">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <h2>Ready to Grow Your Social Media?</h2>
          <p>Join 188,888+ users who trust Social Promotion World. Start today with as little as ₦120.</p>
          <button className="btn btn-white btn-lg" onClick={() => onOpenModal('signup')}>
            Create Free Account
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
