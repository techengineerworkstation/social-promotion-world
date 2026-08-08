import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Testimonials.css'

const testimonials = [
  {
    text: '"Switched from 3 different panels and finally found reliability. Costs dropped by 45% and delivery is incredibly stable."',
    author: 'Marketing Agency',
    location: 'United States',
    avatar: 'M',
    rating: 5,
  },
  {
    text: '"Paystack deposits work instantly and the followers quality is unmatched. Best panel for Nigerian creators."',
    author: 'Content Creator',
    location: 'Nigeria',
    avatar: 'C',
    rating: 5,
  },
  {
    text: '"Managing influencer campaigns became effortless. Clean interface and powerful API for automation."',
    author: 'Social Media Agency',
    location: 'Ghana',
    avatar: 'A',
    rating: 5,
  },
  {
    text: '"The multi-currency support is a game-changer. I pay in GHS and my Nigerian clients pay in NGN — seamless!"',
    author: 'Digital Agency',
    location: 'Ghana',
    avatar: 'D',
    rating: 5,
  },
  {
    text: '"Cheapest rates I\'ve found with actual refill guarantee. My YouTube channel grew from 0 to 50K in 3 months."',
    author: 'YouTuber',
    location: 'Kenya',
    avatar: 'Y',
    rating: 5,
  },
  {
    text: '"API integration saved me hours every day. I built my own panel on top and resell to my clients."',
    author: 'SaaS Founder',
    location: 'South Africa',
    avatar: 'S',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[current]

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section className="testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3 }}
        >
          <span className="section-tag">Testimonials</span>
          <h2>Loved by 188,888+ Users</h2>
          <p>Real reviews from agencies, creators, and resellers worldwide.</p>
        </motion.div>

        <div className="carousel-wrapper">
          <div className="carousel">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                className="testimonial-card carousel-card"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <div className="stars">
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.author}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="carousel-btn prev" onClick={prev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="carousel-btn next" onClick={next} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === current ? 'active' : ''}`}
              onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx) }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
