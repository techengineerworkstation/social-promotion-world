import { useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

const MULTIPLIERS = {
  NGN: 100,
  USD: 100,
  GHS: 100,
  KES: 100,
  ZAR: 100,
}

export function usePaystack() {
  const { user, profile, updateBalance } = useAuth()

  const initializePayment = useCallback((amount, currency = 'NGN', onSuccess, onError) => {
    if (!user) {
      onError?.('Please sign in to make a payment')
      return
    }

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'undefined') {
      onError?.('Payment system not configured. Contact support.')
      return
    }

    const multiplier = MULTIPLIERS[currency] || 100
    const amountInMinorUnit = Math.round(amount * multiplier)

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: amountInMinorUnit,
      currency: currency,
      ref: `SPW_${currency}_${Date.now()}_${user.id.slice(0, 8)}`,
      metadata: {
        user_id: user.email,
        payment_type: 'Wallet Funding',
        currency: currency,
      },
      onSuccess: async (transaction) => {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: transaction.reference }),
          })
          const { data } = await response.json()

          if (data && data.status === 'success') {
            const fundedAmount = data.amount / (MULTIPLIERS[currency] || 100)
            await updateBalance((profile?.balance || 0) + fundedAmount)
            onSuccess?.(transaction, fundedAmount, currency)
          } else {
            onError?.('Payment verification failed. Contact support.')
          }
        } catch {
          onError?.('Network error. Contact support.')
        }
      },
      onCancel: () => {
        onError?.('Payment was cancelled')
      },
    })

    handler.openIframe()
  }, [user, profile, updateBalance])

  return { initializePayment }
}
