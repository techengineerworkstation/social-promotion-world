import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import ImageGallery from './components/ImageGallery'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Modal from './components/Modal'
import './App.css'

function AppContent() {
  const [modalType, setModalType] = useState(null)

  const openModal = (type) => setModalType(type)
  const closeModal = () => setModalType(null)

  return (
    <div className="app">
      <Header onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <Services />
        <ImageGallery />
        <Pricing />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA onOpenModal={openModal} />
      </main>
      <Footer />
      <AnimatePresence>
        {modalType && <Modal type={modalType} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
