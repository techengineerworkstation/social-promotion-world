import React from 'react'
import { motion } from 'framer-motion'
import './ImageGallery.css'

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Black woman working on laptop — digital entrepreneur',
    caption: 'Empowering Digital Creators',
  },
  {
    src: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Diverse team collaborating in co-working space',
    caption: 'Built for Global Teams',
  },
  {
    src: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'African professionals in business meeting',
    caption: 'Trusted Across Africa',
  },
  {
    src: 'https://images.pexels.com/photos/11085414/pexels-photo-11085414.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Young African entrepreneur on smartphone',
    caption: 'Mobile-First Growth',
  },
  {
    src: 'https://images.pexels.com/photos/3861961/pexels-photo-3861961.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Social media content creation',
    caption: 'Content That Converts',
  },
  {
    src: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Analytics dashboard and data visualization',
    caption: 'Data-Driven Results',
  },
  {
    src: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Asian digital marketer working remotely',
    caption: 'Multi-National Reach',
  },
  {
    src: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Creative professional using tablet',
    caption: 'Creativity Unlocked',
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
    <section className="image-gallery-section sheen">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <span className="section-tag">Community</span>
          <h2>Empowering Creators Worldwide</h2>
          <p>From Lagos to London, Nairobi to New York — join a global community of creators and agencies.</p>
        </motion.div>

        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`gallery-item ${idx === 0 ? 'large' : ''} ${idx === 3 ? 'wide' : ''}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="gallery-stats"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
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
