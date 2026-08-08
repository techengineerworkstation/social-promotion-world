import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import './RecentPurchases.css'

const platformColors = {
  instagram: '#E1306C',
  youtube: '#FF0000',
  tiktok: '#000000',
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  telegram: '#0088CC',
  spotify: '#1DB954',
  linkedin: '#0A66C2',
}

const platformNames = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  twitter: 'Twitter/X',
  telegram: 'Telegram',
  spotify: 'Spotify',
  linkedin: 'LinkedIn',
}

const samplePurchases = [
  { platform: 'instagram', service: 'Followers', quantity: 5000, user: 'chidi_***', time: '2 min ago' },
  { platform: 'youtube', service: 'Views', quantity: 10000, user: 'ama_k***', time: '3 min ago' },
  { platform: 'tiktok', service: 'Video Views', quantity: 50000, user: 'kwame_***', time: '5 min ago' },
  { platform: 'instagram', service: 'Likes', quantity: 2000, user: 'fatima_***', time: '6 min ago' },
  { platform: 'facebook', service: 'Page Likes', quantity: 3000, user: 'jide_***', time: '8 min ago' },
  { platform: 'spotify', service: 'Plays', quantity: 25000, user: 'nana_***', time: '9 min ago' },
  { platform: 'youtube', service: 'Subscribers', quantity: 1000, user: 'zainab_***', time: '10 min ago' },
  { platform: 'telegram', service: 'Members', quantity: 5000, user: 'tunde_***', time: '11 min ago' },
  { platform: 'linkedin', service: 'Connections', quantity: 500, user: 'ikechi_***', time: '12 min ago' },
  { platform: 'twitter', service: 'Followers', quantity: 2000, user: 'bisi_***', time: '13 min ago' },
  { platform: 'tiktok', service: 'Followers', quantity: 10000, user: 'uche_***', time: '14 min ago' },
  { platform: 'instagram', service: 'Reels Views', quantity: 100000, user: 'yemi_***', time: '15 min ago' },
]

export default function RecentPurchases() {
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(20)
      if (data && data.length > 0) {
        const formatted = data.map(order => ({
          platform: order.platform || 'instagram',
          service: order.service_name,
          quantity: order.quantity,
          user: order.profiles?.full_name || 'Anonymous',
          time: 'Recently',
        }))
        setPurchases([...formatted, ...samplePurchases])
      } else {
        setPurchases(samplePurchases)
      }
    }
    fetchRecentOrders()
  }, [])

  const duplicatedPurchases = [...purchases, ...purchases]

  return (
    <div className="recent-purchases">
      <div className="purchases-label">
        <span className="live-dot"></span>
        Live Orders
      </div>
      <div className="purchases-marquee">
        <div className="marquee-track">
          {duplicatedPurchases.map((purchase, idx) => (
            <div key={idx} className="purchase-item">
              <span className="purchase-platform" style={{ color: platformColors[purchase.platform] }}>
                {platformNames[purchase.platform]}
              </span>
              <span className="purchase-service">{purchase.service}</span>
              <span className="purchase-qty">{purchase.quantity.toLocaleString()}</span>
              <span className="purchase-user">{purchase.user}</span>
              <span className="purchase-time">{purchase.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
