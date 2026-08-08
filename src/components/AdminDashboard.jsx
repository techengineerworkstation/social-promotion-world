import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAdmin } from '../context/AdminContext'
import './AdminDashboard.css'

const menuItems = [
  { id: 'overview', label: 'Overview', icon: '◉' },
  { id: 'users', label: 'Users', icon: '☻' },
  { id: 'orders', label: 'Orders', icon: '☑' },
  { id: 'transactions', label: 'Transactions', icon: '¤' },
  { id: 'cart', label: 'Carts', icon: '◔' },
  { id: 'history', label: 'Action History', icon: '◷' },
]

function StatCard({ label, value, change, color }) {
  return (
    <div className="stat-card glass">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {change && <span className={`stat-change ${change > 0 ? 'positive' : 'negative'}`}>
        {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
      </span>}
    </div>
  )
}

function Overview() {
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0, pending: 0 })

  useEffect(() => {
    async function fetchStats() {
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      const { count: orders } = await supabase.from('orders').select('*', { count: 'exact', head: true })
      const { count: pending } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending')
      const { data: txns } = await supabase.from('transactions').select('amount').eq('payment_status', 'success')
      const revenue = txns?.reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0
      setStats({ users: users || 0, orders: orders || 0, revenue, pending: pending || 0 })
    }
    fetchStats()
  }, [])

  return (
    <div className="overview-section">
      <div className="stats-grid">
        <StatCard label="Total Users" value={stats.users.toLocaleString()} change={12} />
        <StatCard label="Total Orders" value={stats.orders.toLocaleString()} change={8} />
        <StatCard label="Revenue" value={`₦${stats.revenue.toLocaleString()}`} change={24} />
        <StatCard label="Pending Orders" value={stats.pending.toLocaleString()} />
      </div>
    </div>
  )
}

function UsersTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    setUsers(data || [])
    setLoading(false)
  }

  const filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>Registered Users ({users.length})</h3>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="loading-cell">Loading...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan="6" className="loading-cell">No users found</td></tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.full_name || '—'}</td>
                  <td>{user.email}</td>
                  <td className="price">₦{user.balance?.toLocaleString() || '0.00'}</td>
                  <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                  <td><span className={`status-badge ${user.status}`}>{user.status || 'active'}</span></td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrdersTable() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*, profiles(email, full_name)')
      .order('created_at', { ascending: false })
      .limit(100)
    setOrders(data || [])
    setLoading(false)
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId')
    fetchOrders()
  }

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>Orders ({orders.length})</h3>
        <div className="filter-tabs">
          {['all', 'pending', 'processing', 'completed', 'cancelled'].map(s => (
            <button
              key={s}
              className={`filter-tab ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" className="loading-cell">Loading...</td></tr>
            ) : filteredOrders.length === 0 ? (
              <tr><td colSpan="8" className="loading-cell">No orders found</td></tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="id-cell">{order.id?.slice(0, 8)}...</td>
                  <td>{order.profiles?.full_name || order.profiles?.email || '—'}</td>
                  <td>{order.service_name}</td>
                  <td>{order.quantity?.toLocaleString()}</td>
                  <td className="price">₦{order.price?.toLocaleString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`status-select ${order.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="partial">Partial</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refill">Refill</option>
                    </select>
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-ghost" onClick={() => window.open(order.link, '_blank')}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TransactionsTable() {
  const [txns, setTxns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('transactions')
      .select('*, profiles(email, full_name)')
      .order('created_at', { ascending: false })
      .limit(100)
    setTxns(data || [])
    setLoading(false)
  }

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>Transactions ({txns.length})</h3>
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="loading-cell">Loading...</td></tr>
            ) : txns.length === 0 ? (
              <tr><td colSpan="7" className="loading-cell">No transactions found</td></tr>
            ) : (
              txns.map((txn) => (
                <tr key={txn.id}>
                  <td className="id-cell">{txn.id?.slice(0, 8)}...</td>
                  <td>{txn.profiles?.full_name || txn.profiles?.email || '—'}</td>
                  <td><span className={`txn-type ${txn.type}`}>{txn.type}</span></td>
                  <td className="price">₦{txn.amount?.toLocaleString()}</td>
                  <td>{txn.payment_method || '—'}</td>
                  <td><span className={`status-badge ${txn.payment_status}`}>{txn.payment_status}</span></td>
                  <td>{new Date(txn.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CartTable() {
  const [carts, setCarts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCarts()
  }, [])

  const fetchCarts = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('cart_items')
      .select('*, profiles(email, full_name), services(name)')
      .order('created_at', { ascending: false })
      .limit(100)
    setCarts(data || [])
    setLoading(false)
  }

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>Saved Carts ({carts.length})</h3>
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Link</th>
              <th>Quantity</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="loading-cell">Loading...</td></tr>
            ) : carts.length === 0 ? (
              <tr><td colSpan="5" className="loading-cell">No cart items found</td></tr>
            ) : (
              carts.map((item) => (
                <tr key={item.id}>
                  <td>{item.profiles?.full_name || item.profiles?.email || '—'}</td>
                  <td>{item.services?.name || item.service_name}</td>
                  <td className="link-cell">{item.link?.slice(0, 40)}...</td>
                  <td>{item.quantity?.toLocaleString()}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HistoryTable() {
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('action_history')
      .select('*, profiles(email, full_name)')
      .order('created_at', { ascending: false })
      .limit(150)
    setActions(data || [])
    setLoading(false)
  }

  return (
    <div className="table-section">
      <div className="table-header">
        <h3>Action History ({actions.length})</h3>
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="loading-cell">Loading...</td></tr>
            ) : actions.length === 0 ? (
              <tr><td colSpan="5" className="loading-cell">No action history found</td></tr>
            ) : (
              actions.map((action) => (
                <tr key={action.id}>
                  <td>{action.profiles?.full_name || action.profiles?.email || '—'}</td>
                  <td><span className={`action-type ${action.action_type}`}>{action.action_type}</span></td>
                  <td className="details-cell">{action.details?.slice(0, 60) || '—'}</td>
                  <td>{action.ip_address || '—'}</td>
                  <td>{new Date(action.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('overview')
  const { admin, adminLogout } = useAdmin()

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <Overview />
      case 'users': return <UsersTable />
      case 'orders': return <OrdersTable />
      case 'transactions': return <TransactionsTable />
      case 'cart': return <CartTable />
      case 'history': return <HistoryTable />
      default: return <Overview />
    }
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <span className="logo-icon">&#9650;</span>
          <span>Admin Panel</span>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <span className="item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">{admin?.name?.[0] || 'A'}</div>
            <div>
              <strong>{admin?.name}</strong>
              <span>{admin?.email}</span>
            </div>
          </div>
          <button className="btn btn-ghost btn-block" onClick={adminLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <h2>{menuItems.find(m => m.id === activeView)?.label || 'Overview'}</h2>
          <span className="admin-badge">Super Admin</span>
        </header>
        <div className="admin-content">
          {renderView()}
        </div>
      </main>
    </div>
  )
}
