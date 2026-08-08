import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { AdminProvider, useAdmin } from './context/AdminContext'
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
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function AppContent() {
  const [modalType, setModalType] = useState(null)
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#home')
  const { admin, loading: adminLoading } = useAdmin()

  useEffect(() => {
    const handleHash = () => setCurrentPage(window.location.hash || '#home')
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const openModal = (type) => setModalType(type)
  const closeModal = () => setModalType(null)

  if (currentPage === '#admin' || currentPage === '#admin-login') {
    if (adminLoading) return <div className="loading-screen">Loading...</div>
    if (admin) return <AdminDashboard />
    return <AdminLogin />
  }

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
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
