const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { reference } = req.body

  if (!reference) {
    return res.status(400).json({ error: 'Transaction reference is required' })
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (data.status && data.data.status === 'success') {
      return res.status(200).json({
        status: 'success',
        amount: data.data.amount,
        reference: data.data.reference,
        customer: data.data.customer,
        metadata: data.data.metadata,
      })
    } else {
      return res.status(400).json({
        status: 'failed',
        message: data.message || 'Payment verification failed',
      })
    }
  } catch (error) {
    console.error('Paystack verification error:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to verify payment',
    })
  }
}
