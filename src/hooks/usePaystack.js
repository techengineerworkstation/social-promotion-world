import { useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

export function usePaystack() {
  const { user, profile, updateBalance } = useAuth()

  const initializePayment = useCallback((amountInNaira, onSuccess, onError) => {
    if (!user) {
      onError?.('Please sign in to make a payment')
      return
    }

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'undefined') {
      onError?.('Payment system not configured. Contact support.')
      return
    }

    const amountInKobo = Math.round(amountInNaira * 100)

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: amountInKobo,
      currency: 'NGN',
      ref: `SPW_${Date.now()}_${user.id.slice(0, 8)}`,
      metadata: {
        user_id: user.email,
        payment_type: 'Wallet Funding',
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
            const fundedAmountNaira = data.amount / 100
            await updateBalance((profile?.balance || 0) + fundedAmountNaira)
            onSuccess?.(transaction, fundedAmountNaira)
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
