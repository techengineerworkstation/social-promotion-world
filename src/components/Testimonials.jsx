import React from 'react'
import { motion } from 'framer-motion'
import './Testimonials.css'

const testimonials = [
  {
    text: '"Switched from 3 different panels and finally found reliability. Costs dropped by 45% and delivery is incredibly stable."',
    author: 'Marketing Agency',
    location: 'United States',
    avatar: 'M',
  },
  {
    text: '"Paystack deposits work instantly and the followers quality is unmatched. Best panel for Nigerian creators."',
    author: 'Content Creator',
    location: 'Nigeria',
    avatar: 'C',
  },
  {
    text: '"Managing influencer campaigns became effortless. Clean interface and powerful API for automation."',
    author: 'Social Media Agency',
    location: 'Ghana',
    avatar: 'A',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag">Testimonials</span>
          <h2>Loved by 188,888+ Users</h2>
          <p>Real reviews from agencies, creators, and resellers worldwide.</p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              className="testimonial-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
              }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
            >
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>{t.text}</p>
              <div className="testimonial-author">
                <div className="avatar">{t.avatar}</div>
                <div>
                  <strong>{t.author}</strong>
                  <span>{t.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
