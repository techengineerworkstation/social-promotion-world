import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Header.css'

export default function Header({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, profile } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="container">
        <nav className="navbar">
          <a href="/" className="logo">
            <span className="logo-icon">&#9650;</span>
            <span className="logo-text">Social<span className="highlight">Promotion</span> World</span>
          </a>

          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {user ? (
              <div className="user-menu">
                <button className="btn btn-ghost user-btn" onClick={() => onOpenModal('dashboard')}>
                  <span className="user-avatar-small">{profile?.full_name?.[0]?.toUpperCase() || 'U'}</span>
                  <span className="user-balance">₦{profile?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}</span>
                </button>
              </div>
            ) : (
              <>
                <button className="btn btn-ghost" onClick={() => onOpenModal('login')}>Sign In</button>
                <button className="btn btn-primary" onClick={() => onOpenModal('signup')}>Get Started</button>
              </>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={mobileOpen ? 'open' : ''}></span>
            <span className={mobileOpen ? 'open' : ''}></span>
            <span className={mobileOpen ? 'open' : ''}></span>
          </button>
        </nav>
      </div>
    </motion.header>
  )
}
