import React from 'react'
import { motion } from 'framer-motion'
import './ImageGallery.css'

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/11085414/pexels-photo-11085414.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'African entrepreneur using smartphone for social media marketing',
    caption: 'Grow Your Brand Online',
  },
  {
    src: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Young African creators collaborating on content',
    caption: 'Content That Connects',
  },
  {
    src: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Social media marketing analytics dashboard',
    caption: 'Data-Driven Growth',
  },
  {
    src: 'https://images.pexels.com/photos/4050436/pexels-photo-4050436.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'African influencer creating video content',
    caption: 'Influencer Ready',
  },
  {
    src: 'https://images.pexels.com/photos/3183173/pexels-photo-3183173.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Team collaboration on digital marketing strategy',
    caption: 'Built for Teams',
  },
  {
    src: 'https://images.pexels.com/photos/6476585/pexels-photo-6476585.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Social media engagement on mobile device',
    caption: 'Engagement Delivered',
  },
]

const stats = [
  { value: '188K+', label: 'Active Users' },
  { label: 'Orders Delivered', value: '5 Crore+' },
  { value: '10K+', label: 'Services' },
  { value: '24/7', label: 'Support' },
]

export default function ImageGallery() {
  return (
    <section className="image-gallery-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag">Trusted Worldwide</span>
          <h2>Growing Brands Across Africa & Beyond</h2>
          <p>Join thousands of creators, agencies, and businesses who trust us for their social media growth.</p>
        </motion.div>

        <motion.div
          className="gallery-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              className={`gallery-item ${idx === 0 ? 'large' : ''} ${idx === 3 ? 'wide' : ''}`}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span>{img.caption}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="gallery-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="gallery-stat">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
