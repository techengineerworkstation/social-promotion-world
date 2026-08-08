import React, { useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

const PAYSTACK_PUBLIC_KEY = 'pk_live_YOUR_PUBLIC_KEY'

export function usePaystack() {
  const { user, profile, updateBalance } = useAuth()

  const initializePayment = useCallback((amountInNaira, onSuccess, onError) => {
    if (!user) {
      onError?.('Please sign in to make a payment')
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
        const { data, error } = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: transaction.reference }),
        }).then(res => res.json())

        if (data && data.status === 'success') {
          const fundedAmountNaira = data.amount / 100
          await updateBalance((profile?.balance || 0) + fundedAmountNaira)
          onSuccess?.(transaction, fundedAmountNaira)
        } else {
          onError?.('Payment verification failed. Contact support.')
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
