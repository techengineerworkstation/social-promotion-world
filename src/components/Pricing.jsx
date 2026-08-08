import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Pricing.css'

const currencies = [
  { code: 'NGN', symbol: '₦', label: 'NGN' },
  { code: 'USD', symbol: '$', label: 'USD' },
  { code: 'GHS', symbol: 'GH₵', label: 'GHS' },
  { code: 'KES', symbol: 'KSh', label: 'KES' },
  { code: 'ZAR', symbol: 'R', label: 'ZAR' },
]

const tabs = [
  { id: 'instagram', label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { id: 'youtube', label: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { id: 'tiktok', label: 'TikTok', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  { id: 'facebook', label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { id: 'twitter', label: 'Twitter/X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { id: 'telegram', label: 'Telegram', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
  { id: 'spotify', label: 'Spotify', icon: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
]

const pricingData = {
  instagram: [
    { id: 'ig-followers', service: 'Instagram Real Followers', desc: 'Active followers, low drop ratio. Refill guarantee included.', prices: { NGN: 1200, USD: 0.80, GHS: 9.60, KES: 96, ZAR: 14.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 100, max: 100000 },
    { id: 'ig-likes', service: 'Instagram Likes', desc: 'Real-looking likes from active profiles. Fast start.', prices: { NGN: 350, USD: 0.23, GHS: 2.80, KES: 28, ZAR: 4.20 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 50000 },
    { id: 'ig-reels', service: 'Instagram Reels Views', desc: 'High-quality reel views. Instant start, lifetime guarantee.', prices: { NGN: 180, USD: 0.12, GHS: 1.44, KES: 14.4, ZAR: 2.16 }, delivery: '0-30 mins', guarantee: 'Lifetime', min: 100, max: 1000000 },
    { id: 'ig-stories', service: 'Instagram Story Views', desc: 'Instant story viewers. Targeted regions available.', prices: { NGN: 250, USD: 0.17, GHS: 2.00, KES: 20, ZAR: 3.00 }, delivery: '0-15 mins', guarantee: 'Lifetime', min: 100, max: 500000 },
    { id: 'ig-impressions', service: 'Instagram Impressions', desc: 'Boost post visibility and reach. Drip-feed available.', prices: { NGN: 150, USD: 0.10, GHS: 1.20, KES: 12, ZAR: 1.80 }, delivery: '0-1 hour', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'ig-comments', service: 'Instagram Custom Comments', desc: 'Custom comments from real accounts. Your text or random.', prices: { NGN: 2800, USD: 1.87, GHS: 22.40, KES: 224, ZAR: 33.60 }, delivery: '0-4 hours', guarantee: '30 days', min: 10, max: 5000 },
    { id: 'ig-saves', service: 'Instagram Saves', desc: 'Increase post save count. Signals engagement to algorithm.', prices: { NGN: 450, USD: 0.30, GHS: 3.60, KES: 36, ZAR: 5.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 50000 },
    { id: 'ig-reel-likes', service: 'Instagram Reel Likes', desc: 'Likes specifically for Reel posts. High retention.', prices: { NGN: 400, USD: 0.27, GHS: 3.20, KES: 32, ZAR: 4.80 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 100000 },
  ],
  youtube: [
    { id: 'yt-views', service: 'YouTube Views (High Retention)', desc: 'Monetizable views with 40%+ retention. Safe for monetization.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-4 hours', guarantee: 'Lifetime', min: 1000, max: 1000000 },
    { id: 'yt-subscribers', service: 'YouTube Subscribers', desc: 'Real subscribers, low drop rate. Non-drop option available.', prices: { NGN: 3500, USD: 2.33, GHS: 28.00, KES: 280, ZAR: 42.00 }, delivery: '0-12 hours', guarantee: '60 days', min: 100, max: 100000 },
    { id: 'yt-watchtime', service: 'YouTube Watch Time (Hours)', desc: 'Real watch time for monetization eligibility.', prices: { NGN: 5200, USD: 3.47, GHS: 41.60, KES: 416, ZAR: 62.40 }, delivery: '0-24 hours', guarantee: 'Lifetime', min: 10, max: 10000 },
    { id: 'yt-likes', service: 'YouTube Likes', desc: 'Increase engagement signal. Helps video ranking.', prices: { NGN: 650, USD: 0.43, GHS: 5.20, KES: 52, ZAR: 7.80 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'yt-comments', service: 'YouTube Comments', desc: 'Custom comments from real accounts.', prices: { NGN: 4500, USD: 3.00, GHS: 36.00, KES: 360, ZAR: 54.00 }, delivery: '0-6 hours', guarantee: '30 days', min: 5, max: 5000 },
    { id: 'yt-shares', service: 'YouTube Shares', desc: 'Video shares for social proof and organic reach.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-3 hours', guarantee: 'Lifetime', min: 100, max: 1000000 },
    { id: 'yt-shorts', service: 'YouTube Shorts Views', desc: 'Fast Shorts video views for algorithm push.', prices: { NGN: 400, USD: 0.27, GHS: 3.20, KES: 32, ZAR: 4.80 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'yt-shorts-likes', service: 'YouTube Shorts Likes', desc: 'Engagement boost for Shorts content.', prices: { NGN: 550, USD: 0.37, GHS: 4.40, KES: 44, ZAR: 6.60 }, delivery: '0-1 hour', guarantee: '30 days', min: 100, max: 500000 },
  ],
  tiktok: [
    { id: 'tt-followers', service: 'TikTok Followers', desc: 'Real followers with active profiles. Low drop.', prices: { NGN: 1500, USD: 1.00, GHS: 12.00, KES: 120, ZAR: 18.00 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'tt-views', service: 'TikTok Video Views', desc: 'Instant viral-style views. Triggers algorithm.', prices: { NGN: 120, USD: 0.08, GHS: 0.96, KES: 9.6, ZAR: 1.44 }, delivery: '0-15 mins', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'tt-likes', service: 'TikTok Likes', desc: 'Boost engagement and social proof on videos.', prices: { NGN: 450, USD: 0.30, GHS: 3.60, KES: 36, ZAR: 5.40 }, delivery: '0-1 hour', guarantee: '30 days', min: 100, max: 1000000 },
    { id: 'tt-shares', service: 'TikTok Shares', desc: 'Increase video distribution and reach.', prices: { NGN: 850, USD: 0.57, GHS: 6.80, KES: 68, ZAR: 10.20 }, delivery: '0-2 hours', guarantee: 'Lifetime', min: 50, max: 500000 },
    { id: 'tt-comments', service: 'TikTok Comments', desc: 'Custom comments from real users.', prices: { NGN: 3200, USD: 2.13, GHS: 25.60, KES: 256, ZAR: 38.40 }, delivery: '0-4 hours', guarantee: '30 days', min: 10, max: 5000 },
    { id: 'tt-live', service: 'TikTok Live Views', desc: 'Viewers for live streams. Hourly delivery available.', prices: { NGN: 550, USD: 0.37, GHS: 4.40, KES: 44, ZAR: 6.60 }, delivery: 'Instant', guarantee: 'Per hour', min: 50, max: 10000 },
    { id: 'tt-saves', service: 'TikTok Saves', desc: 'Increase save count for algorithm boost.', prices: { NGN: 700, USD: 0.47, GHS: 5.60, KES: 56, ZAR: 8.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 100000 },
    { id: 'tt-profile-views', service: 'TikTok Profile Views', desc: 'Boost profile visibility and authority.', prices: { NGN: 200, USD: 0.13, GHS: 1.60, KES: 16, ZAR: 2.40 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 500, max: 1000000 },
  ],
  facebook: [
    { id: 'fb-page-likes', service: 'Facebook Page Likes', desc: 'Real page followers from active accounts.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-3 hours', guarantee: '30 days', min: 100, max: 1000000 },
    { id: 'fb-followers', service: 'Facebook Followers', desc: 'Profile and page followers. Country targeting available.', prices: { NGN: 1300, USD: 0.87, GHS: 10.40, KES: 104, ZAR: 15.60 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'fb-post-likes', service: 'Facebook Post Likes', desc: 'Engagement on posts, photos, and links.', prices: { NGN: 550, USD: 0.37, GHS: 4.40, KES: 44, ZAR: 6.60 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'fb-video-views', service: 'Facebook Video Views', desc: 'Real video views. Counts toward monetization.', prices: { NGN: 850, USD: 0.57, GHS: 6.80, KES: 68, ZAR: 10.20 }, delivery: '0-2 hours', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'fb-comments', service: 'Facebook Comments', desc: 'Custom comments from real accounts.', prices: { NGN: 3500, USD: 2.33, GHS: 28.00, KES: 280, ZAR: 42.00 }, delivery: '0-6 hours', guarantee: '30 days', min: 10, max: 5000 },
    { id: 'fb-shares', service: 'Facebook Shares', desc: 'Increase organic reach and social proof.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-3 hours', guarantee: 'Lifetime', min: 50, max: 500000 },
    { id: 'fb-reviews', service: 'Facebook Page Reviews', desc: '5-star page reviews. Custom text available.', prices: { NGN: 4200, USD: 2.80, GHS: 33.60, KES: 336, ZAR: 50.40 }, delivery: '0-12 hours', guarantee: '60 days', min: 5, max: 1000 },
    { id: 'fb-group', service: 'Facebook Group Members', desc: 'Real group members from active profiles.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-6 hours', guarantee: '30 days', min: 100, max: 500000 },
  ],
  twitter: [
    { id: 'tw-followers', service: 'Twitter/X Followers', desc: 'Real followers with active profiles.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-3 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'tw-likes', service: 'Twitter/X Likes', desc: 'Increase tweet engagement and visibility.', prices: { NGN: 600, USD: 0.40, GHS: 4.80, KES: 48, ZAR: 7.20 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'tw-retweets', service: 'Twitter/X Retweets', desc: 'Boost tweet visibility with real retweets.', prices: { NGN: 950, USD: 0.63, GHS: 7.60, KES: 76, ZAR: 11.40 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'tw-impressions', service: 'Twitter/X Impressions', desc: 'Increase tweet reach and impressions.', prices: { NGN: 350, USD: 0.23, GHS: 2.80, KES: 28, ZAR: 4.20 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 500, max: 1000000 },
    { id: 'tw-polls', service: 'Twitter/X Poll Votes', desc: 'Custom poll voting. Instant delivery.', prices: { NGN: 750, USD: 0.50, GHS: 6.00, KES: 60, ZAR: 9.00 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 100000 },
    { id: 'tw-video', service: 'Twitter/X Video Views', desc: 'Video view count boost. High retention.', prices: { NGN: 280, USD: 0.19, GHS: 2.24, KES: 22.4, ZAR: 3.36 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 500, max: 1000000 },
    { id: 'tw-space', service: 'Twitter/X Space Listeners', desc: 'Live audio listeners for Spaces.', prices: { NGN: 1200, USD: 0.80, GHS: 9.60, KES: 96, ZAR: 14.40 }, delivery: 'Instant', guarantee: 'Per hour', min: 20, max: 5000 },
    { id: 'tw-quotes', service: 'Twitter/X Quote Tweets', desc: 'Retweets with additional comments.', prices: { NGN: 1600, USD: 1.07, GHS: 12.80, KES: 128, ZAR: 19.20 }, delivery: '0-3 hours', guarantee: '30 days', min: 10, max: 10000 },
  ],
  telegram: [
    { id: 'tg-members', service: 'Telegram Members', desc: 'Real channel/group members. Low drop.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-6 hours', guarantee: '30 days', min: 100, max: 1000000 },
    { id: 'tg-views', service: 'Telegram Post Views', desc: 'Real post impressions. Instant start.', prices: { NGN: 150, USD: 0.10, GHS: 1.20, KES: 12, ZAR: 1.80 }, delivery: '0-30 mins', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'tg-reactions', service: 'Telegram Reactions', desc: 'Custom emoji reactions on posts.', prices: { NGN: 900, USD: 0.60, GHS: 7.20, KES: 72, ZAR: 10.80 }, delivery: '0-2 hours', guarantee: '30 days', min: 50, max: 500000 },
    { id: 'tg-polls', service: 'Telegram Poll Votes', desc: 'Vote on polls anonymously.', prices: { NGN: 650, USD: 0.43, GHS: 5.20, KES: 52, ZAR: 7.80 }, delivery: '0-1 hour', guarantee: '30 days', min: 50, max: 100000 },
    { id: 'tg-premium', service: 'Telegram Premium Members', desc: 'Premium member adds for channel authority.', prices: { NGN: 3500, USD: 2.33, GHS: 28.00, KES: 280, ZAR: 42.00 }, delivery: '0-12 hours', guarantee: '60 days', min: 50, max: 100000 },
    { id: 'tg-bot', service: 'Telegram Bot Starts', desc: 'Bot start commands for engagement.', prices: { NGN: 450, USD: 0.30, GHS: 3.60, KES: 36, ZAR: 5.40 }, delivery: '0-1 hour', guarantee: 'Lifetime', min: 100, max: 1000000 },
    { id: 'tg-comments', service: 'Telegram Comments', desc: 'Post comments from real users.', prices: { NGN: 2800, USD: 1.87, GHS: 22.40, KES: 224, ZAR: 33.60 }, delivery: '0-4 hours', guarantee: '30 days', min: 10, max: 5000 },
  ],
  spotify: [
    { id: 'sp-plays', service: 'Spotify Plays', desc: 'Real plays from active listeners. Algorithm-safe.', prices: { NGN: 350, USD: 0.23, GHS: 2.80, KES: 28, ZAR: 4.20 }, delivery: '0-2 hours', guarantee: 'Lifetime', min: 1000, max: 10000000 },
    { id: 'sp-followers', service: 'Spotify Followers', desc: 'Artist/profile followers from real accounts.', prices: { NGN: 1600, USD: 1.07, GHS: 12.80, KES: 128, ZAR: 19.20 }, delivery: '0-6 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'sp-monthly', service: 'Spotify Monthly Listeners', desc: 'Increase monthly listener count for algorithm.', prices: { NGN: 2800, USD: 1.87, GHS: 22.40, KES: 224, ZAR: 33.60 }, delivery: '0-24 hours', guarantee: 'Lifetime', min: 500, max: 1000000 },
    { id: 'sp-saves', service: 'Spotify Saves', desc: 'Track saves and library adds.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-3 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'sp-playlist', service: 'Spotify Playlist Placement', desc: 'Add to curated playlists for exposure.', prices: { NGN: 8500, USD: 5.67, GHS: 68.00, KES: 680, ZAR: 102.00 }, delivery: '1-3 days', guarantee: 'Lifetime', min: 1, max: 100 },
    { id: 'sp-presave', service: 'Spotify Pre-Saves', desc: 'Pre-save for new release momentum.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 100000 },
    { id: 'sp-podcast', service: 'Podcast Downloads', desc: 'Episode download boost for podcast ranking.', prices: { NGN: 900, USD: 0.60, GHS: 7.20, KES: 72, ZAR: 10.80 }, delivery: '0-3 hours', guarantee: 'Lifetime', min: 500, max: 1000000 },
  ],
  linkedin: [
    { id: 'li-followers', service: 'LinkedIn Followers', desc: 'Professional network growth. Real profiles.', prices: { NGN: 2500, USD: 1.67, GHS: 20.00, KES: 200, ZAR: 30.00 }, delivery: '0-8 hours', guarantee: '60 days', min: 50, max: 100000 },
    { id: 'li-connections', service: 'LinkedIn Connections', desc: '1st-degree connections from professionals.', prices: { NGN: 3200, USD: 2.13, GHS: 25.60, KES: 256, ZAR: 38.40 }, delivery: '0-12 hours', guarantee: '60 days', min: 20, max: 50000 },
    { id: 'li-post-likes', service: 'LinkedIn Post Likes', desc: 'Engagement on posts and articles.', prices: { NGN: 1800, USD: 1.20, GHS: 14.40, KES: 144, ZAR: 21.60 }, delivery: '0-3 hours', guarantee: '30 days', min: 20, max: 100000 },
    { id: 'li-profile-views', service: 'LinkedIn Profile Views', desc: 'Increase profile visibility to recruiters.', prices: { NGN: 1100, USD: 0.73, GHS: 8.80, KES: 88, ZAR: 13.20 }, delivery: '0-4 hours', guarantee: '30 days', min: 100, max: 500000 },
    { id: 'li-comments', service: 'LinkedIn Comments', desc: 'Professional engagement on posts.', prices: { NGN: 4500, USD: 3.00, GHS: 36.00, KES: 360, ZAR: 54.00 }, delivery: '0-6 hours', guarantee: '30 days', min: 5, max: 5000 },
    { id: 'li-articles', service: 'LinkedIn Article Views', desc: 'Boost article readership and authority.', prices: { NGN: 1400, USD: 0.93, GHS: 11.20, KES: 112, ZAR: 16.80 }, delivery: '0-4 hours', guarantee: 'Lifetime', min: 100, max: 500000 },
    { id: 'li-recommend', service: 'LinkedIn Recommendations', desc: 'Skill endorsements and recommendations.', prices: { NGN: 5800, USD: 3.87, GHS: 46.40, KES: 464, ZAR: 69.60 }, delivery: '0-24 hours', guarantee: '90 days', min: 5, max: 1000 },
    { id: 'li-company', service: 'LinkedIn Company Followers', desc: 'Business page growth and authority.', prices: { NGN: 3800, USD: 2.53, GHS: 30.40, KES: 304, ZAR: 45.60 }, delivery: '0-12 hours', guarantee: '60 days', min: 50, max: 200000 },
  ],
}

function OrderForm({ service, currency, onBack }) {
  const [link, setLink] = useState('')
  const [quantity, setQuantity] = useState(service.min)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const { user } = useAuth()

  const currentCurrency = currencies.find(c => c.code === currency)
  const pricePer1000 = service.prices[currency]
  const totalPrice = ((quantity / 1000) * pricePer1000).toFixed(2)

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value) || service.min
    if (val < service.min) {
      setError(`Minimum order is ${service.min.toLocaleString()}`)
      setQuantity(service.min)
    } else if (val > service.max) {
      setError(`Maximum order is ${service.max.toLocaleString()}`)
      setQuantity(service.max)
    } else {
      setError('')
      setQuantity(val)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!link.trim()) {
      setError('Please enter a valid link')
      return
    }
    setProcessing(true)

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user?.id || null,
          service_name: service.service,
          link: link,
          quantity: quantity,
          price: parseFloat(totalPrice),
          status: 'pending',
          platform: service.id.split('-')[0],
        }])
        .select()
        .single()

      if (orderError) throw orderError

      const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
      const amountInMinor = Math.round(parseFloat(totalPrice) * 100)
      const orderRef = `SPW_${orderData.id.slice(0, 8)}_${Date.now()}`

      await supabase.from('transactions').insert([{
        user_id: user?.id || null,
        type: 'order',
        amount: parseFloat(totalPrice),
        currency: currency,
        payment_method: 'paystack',
        payment_reference: orderRef,
        payment_status: 'pending',
        description: `Order: ${service.service} x${quantity}`,
        metadata: { order_id: orderData.id, service_id: service.id },
      }])

      const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: user?.email || 'guest@socialpromotionworld.com',
        amount: amountInMinor,
        currency: currency,
        ref: orderRef,
        metadata: {
          order_id: orderData.id,
          service: service.service,
          quantity: quantity,
        },
        onSuccess: async (transaction) => {
          await supabase.from('orders')
            .update({ status: 'processing' })
            .eq('id', orderData.id)
          await supabase.from('transactions')
            .update({ payment_status: 'success', payment_reference: transaction.reference })
            .eq('payment_reference', orderRef)
          alert('Payment successful! Your order is being processed.')
          onBack()
        },
        onCancel: async () => {
          await supabase.from('orders')
            .update({ status: 'cancelled' })
            .eq('id', orderData.id)
        },
      })

      handler.openIframe()
    } catch (err) {
      setError('Failed to create order. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <motion.div
      className="order-form"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
    >
      <button className="back-btn" onClick={onBack}>
        &larr; Back to services
      </button>
      <div className="order-service-info">
        <h3>{service.service}</h3>
        <p>{service.desc}</p>
        <div className="order-meta">
          <span className="meta-badge delivery">{service.delivery}</span>
          <span className="meta-badge guarantee">{service.guarantee}</span>
          <span className="meta-badge min">Min: {service.min.toLocaleString()}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile / Post Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder={`https://${service.id.split('-')[0]}.com/yourusername`}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity ({service.min.toLocaleString()} - {service.max.toLocaleString()})</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={service.min}
            max={service.max}
            step={service.min}
          />
          <div className="quantity-presets">
            {[service.min, service.min * 10, service.min * 100, service.max].filter((v, i, a) => v <= service.max && a.indexOf(v) === i).map(val => (
              <button key={val} type="button" className="preset-btn" onClick={() => { setQuantity(val); setError('') }}>
                {val.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="order-summary">
          <div className="summary-row">
            <span>Price per 1000:</span>
            <span>{currentCurrency.symbol}{pricePer1000.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Quantity:</span>
            <span>{quantity.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{currentCurrency.symbol}{totalPrice} {currency}</span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={processing}>
          {processing ? 'Processing...' : `Pay ${currentCurrency.symbol}${totalPrice} ${currency} via Paystack`}
        </button>
        {!user && <p className="guest-note">Ordering as guest. <a href="#" onClick={(e) => { e.preventDefault(); window.openModal && window.openModal('signup') }}>Create an account</a> to track orders.</p>}
      </form>
    </motion.div>
  )
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('instagram')
  const [currency, setCurrency] = useState('NGN')
  const [selectedService, setSelectedService] = useState(null)

  const currentCurrency = currencies.find(c => c.code === currency)

  const formatPrice = (price) => {
    if (price >= 1) return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    return price.toFixed(2)
  }

  const currentTab = tabs.find(t => t.id === activeTab)

  if (selectedService) {
    return (
      <section id="pricing" className="pricing">
        <div className="container">
          <OrderForm
            service={selectedService}
            currency={currency}
            onBack={() => setSelectedService(null)}
          />
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <span className="section-tag">Pricing & Orders</span>
          <h2>Select a Service & Pay via Paystack</h2>
          <p>Wholesale rates in 5 currencies. Instant order processing. Refill guarantee.</p>
        </motion.div>

        <motion.div
          className="currency-selector"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <span className="currency-label">Currency:</span>
          {currencies.map((curr) => (
            <button
              key={curr.code}
              className={`currency-btn ${currency === curr.code ? 'active' : ''}`}
              onClick={() => setCurrency(curr.code)}
            >
              {curr.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="pricing-tabs"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn tab-with-icon ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="tab-icon">
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {currentTab && (
          <div className="platform-header">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="platform-icon">
              <path d={currentTab.icon} />
            </svg>
            <h3>{currentTab.label} Services</h3>
          </div>
        )}

        <motion.div
          className="pricing-table-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + currency}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Per 1000</th>
                    <th>Delivery</th>
                    <th>Guarantee</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData[activeTab]?.map((row) => (
                    <tr key={row.id}>
                      <td><strong>{row.service}</strong></td>
                      <td className="desc">{row.desc}</td>
                      <td className="price">{currentCurrency.symbol}{formatPrice(row.prices[currency])}</td>
                      <td className="delivery">{row.delivery}</td>
                      <td className="guarantee">{row.guarantee}</td>
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => setSelectedService(row)}>
                          Order Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
