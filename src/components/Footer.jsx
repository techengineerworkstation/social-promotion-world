import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="footer-brand">
            <a href="/" className="logo">
              <span className="logo-icon">&#9650;</span>
              <span className="logo-text">Social<span className="highlight">Promotion</span> World</span>
            </a>
            <p>The cheapest and most trusted SMM panel for social media growth. Trusted by 150,000+ users worldwide.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li><a href="#">Live Chat</a></li>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="mailto:support@socialpromotionworld.com">support@socialpromotionworld.com</a></li>
              <li><a href="#">Ticket System</a></li>
            </ul>
          </div>
        </motion.div>
        <div className="footer-bottom">
          <p>&copy; 2026 Social Promotion World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
