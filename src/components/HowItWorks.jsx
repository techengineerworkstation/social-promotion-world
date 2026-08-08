import React from 'react'
import { motion } from 'framer-motion'
import './HowItWorks.css'

const steps = [
  { number: '1', title: 'Create Account', description: 'Sign up for free in seconds. No credit card required.' },
  { number: '2', title: 'Fund Wallet', description: 'Add money via Paystack, bank transfer, or crypto.' },
  { number: '3', title: 'Place Order', description: 'Choose service, enter link, set quantity. Growth begins!' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag">How It Works</span>
          <h2>Get Started in 3 Simple Steps</h2>
          <p>From signup to growth in under 2 minutes. It's that simple.</p>
        </motion.div>

        <div className="steps">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <motion.div
                className="step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
              {idx < steps.length - 1 && <div className="step-connector" />}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          className="payment-methods"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3>Accepted Payment Methods</h3>
          <div className="payment-grid">
            {['Paystack', 'Bank Transfer', 'Bitcoin', 'USDT', 'Card Payment', 'Bank Deposit'].map((method) => (
              <div className="payment-card" key={method}>
                <span className="payment-icon">&#9679;</span>
                <span>{method}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
