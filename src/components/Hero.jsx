import React, { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import './Hero.css'

function FloatingShape({ position, color, scale = 1, speed = 1 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          flatShading
        />
      </mesh>
    </Float>
  )
}

export default function Hero({ onOpenModal }) {
  return (
    <section className="hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#6366f1" />
          <pointLight position={[-10, -5, -5]} intensity={0.4} color="#ec4899" />
          <FloatingShape position={[-3, 1, -2]} color="#6366f1" scale={0.8} speed={0.8} />
          <FloatingShape position={[3, -1, -1]} color="#ec4899" scale={0.5} speed={1.2} />
          <FloatingShape position={[2, 2, -4]} color="#06b6d4" scale={0.3} speed={1.5} />
          <fog attach="fog" args={['#0f172a', 8, 20]} />
        </Canvas>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Trusted by 150,000+ Users Worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Grow Your Social Media <span className="gradient-text">Instantly</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            The cheapest and most reliable SMM panel for Instagram, YouTube, TikTok, Facebook, Twitter/X and 10+ platforms. Real results, fast delivery, lifetime guarantee.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
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
            transition={{ delay: 0.5, duration: 0.4 }}
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
        </motion.div>
      </div>
    </section>
  )
}
