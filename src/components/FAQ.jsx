import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FAQ.css'

const faqs = [
  {
    question: 'What is an SMM Panel?',
    answer: 'An SMM (Social Media Marketing) Panel is an online platform where you can purchase social media services like followers, likes, views, comments, and more. It\'s used by influencers, agencies, and businesses to boost their online presence quickly and affordably.'
  },
  {
    question: 'Is it safe to use your services?',
    answer: 'Absolutely! All our services use safe, tested delivery methods that won\'t harm your account. We never ask for passwords, and all engagement looks natural. Thousands of users trust us daily.'
  },
  {
    question: 'How fast is the delivery?',
    answer: 'Most orders start within seconds to minutes. Delivery speed depends on the service and quantity. You can track real-time progress in your dashboard.'
  },
  {
    question: 'What is the refill guarantee?',
    answer: 'If any followers/views/likes drop after delivery, we automatically refill them for free within the guarantee period. Most services come with lifetime or 30-day refill protection.'
  },
  {
    question: 'Do you offer API for resellers?',
    answer: 'Yes! We provide a full REST API that allows you to integrate our services into your own panel, automate orders, and build your reseller business.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Paystack (card, bank transfer, USSD), Bitcoin, USDT, and bank deposits. All transactions are encrypted and secure.'
  },
]

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{faq.question}</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="faq">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our SMM panel.</p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <FaqItem
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
