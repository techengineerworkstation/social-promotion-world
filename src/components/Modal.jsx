import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { usePaystack } from '../hooks/usePaystack'
import './Modal.css'

const currencies = [
  { code: 'NGN', symbol: '₦', label: 'NGN', min: 100 },
  { code: 'USD', symbol: '$', label: 'USD', min: 1 },
  { code: 'GHS', symbol: 'GH₵', label: 'GHS', min: 1 },
  { code: 'KES', symbol: 'KSh', label: 'KES', min: 10 },
  { code: 'ZAR', symbol: 'R', label: 'ZAR', min: 1 },
]

const quickAmounts = {
  NGN: [500, 1000, 2000, 5000, 10000],
  USD: [5, 10, 25, 50, 100],
  GHS: [50, 100, 200, 500, 1000],
  KES: [500, 1000, 2500, 5000, 10000],
  ZAR: [50, 100, 250, 500, 1000],
}

export default function Modal({ type: initialType, onClose }) {
  const [modalType, setModalType] = useState(initialType)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fundAmount, setFundAmount] = useState('')
  const [showFunding, setShowFunding] = useState(false)
  const [currency, setCurrency] = useState('NGN')
  const { signIn, signUp, user, profile, signOut } = useAuth()
  const { initializePayment } = usePaystack()

  const currentCurrency = currencies.find(c => c.code === currency)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const formData = new FormData(e.target)
      await signIn(formData.get('email'), formData.get('password'))
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const formData = new FormData(e.target)
      await signUp(formData.get('email'), formData.get('password'), formData.get('name'))
      setShowFunding(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFundWallet = () => {
    const amount = parseFloat(fundAmount)
    if (!amount || amount < currentCurrency.min) {
      setError(`Minimum funding amount is ${currentCurrency.symbol}${currentCurrency.min}`)
      return
    }
    setError('')
    initializePayment(
      amount,
      currency,
      (transaction, fundedAmount, paidCurrency) => {
        setError('')
        alert(`Wallet funded successfully with ${currencies.find(c => c.code === paidCurrency)?.symbol}${fundedAmount.toLocaleString()}!`)
        setFundAmount('')
        setShowFunding(false)
      },
      (err) => {
        setError(err)
      }
    )
  }

  if (user && profile && !showFunding) {
    return (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>&times;</button>
          <div className="modal-content dashboard-modal">
            <div className="user-info">
              <div className="user-avatar">{profile.full_name?.[0]?.toUpperCase() || 'U'}</div>
              <div className="user-details">
                <h3>{profile.full_name}</h3>
                <p>{profile.email}</p>
              </div>
            </div>
            <div className="balance-card">
              <span className="balance-label">Wallet Balance</span>
              <span className="balance-amount">₦{profile.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}</span>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary btn-block" onClick={() => setShowFunding(true)}>
                Fund Wallet
              </button>
              <button className="btn btn-outline btn-block" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (showFunding) {
    return (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>&times;</button>
          <div className="modal-content">
            <h2>Fund Your Wallet</h2>
            <p>Pay securely via Paystack in your preferred currency</p>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Currency</label>
              <div className="currency-toggle">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    className={`currency-btn ${currency === curr.code ? 'active' : ''}`}
                    onClick={() => { setCurrency(curr.code); setFundAmount('') }}
                  >
                    {curr.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Amount ({currency})</label>
              <input
                type="number"
                min={currentCurrency.min}
                step={currentCurrency.min}
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder={`Enter amount (min ${currentCurrency.symbol}${currentCurrency.min})`}
              />
            </div>

            <div className="quick-amounts">
              {quickAmounts[currency].map(amt => (
                <button
                  key={amt}
                  className="quick-amount-btn"
                  onClick={() => setFundAmount(amt.toString())}
                >
                  {currentCurrency.symbol}{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <button className="btn btn-primary btn-block" onClick={handleFundWallet}>
              Pay {currentCurrency.symbol}{parseFloat(fundAmount || 0).toLocaleString()} with Paystack
            </button>
            <button className="btn btn-ghost btn-block" onClick={() => setShowFunding(false)}>
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>&times;</button>

        {error && <div className="error-message">{error}</div>}

        {modalType === 'login' ? (
          <div className="modal-content">
            <h2>Welcome Back</h2>
            <p>Sign in to manage your orders</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter your password" required />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="modal-switch">
              Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setModalType('signup'); setError('') }}>Sign up</a>
            </p>
          </div>
        ) : (
          <div className="modal-content">
            <h2>Create Account</h2>
            <p>Get started in less than 30 seconds</p>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Create a password (min 6 chars)" minLength="6" required />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p className="modal-switch">
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setModalType('login'); setError('') }}>Sign in</a>
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
