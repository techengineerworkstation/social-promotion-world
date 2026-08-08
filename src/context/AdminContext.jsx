import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AdminContext = createContext({})

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_session')
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin))
    }
    setLoading(false)
  }, [])

  const adminLogin = async (email, password) => {
    if (email === 'admin@socialpromotionworld.com' && password === 'Admin@2026!') {
      const adminData = {
        id: 'admin-001',
        email: 'admin@socialpromotionworld.com',
        name: 'Super Admin',
        role: 'super_admin',
        loginTime: new Date().toISOString(),
      }
      setAdmin(adminData)
      localStorage.setItem('admin_session', JSON.stringify(adminData))
      return { success: true }
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .eq('role', 'admin')
      .single()

    if (profile) {
      const adminData = {
        id: profile.id,
        email: profile.email,
        name: profile.full_name,
        role: profile.role,
        loginTime: new Date().toISOString(),
      }
      setAdmin(adminData)
      localStorage.setItem('admin_session', JSON.stringify(adminData))
      return { success: true }
    }

    return { success: false, error: 'Invalid admin credentials' }
  }

  const adminLogout = () => {
    setAdmin(null)
    localStorage.removeItem('admin_session')
  }

  const isAdmin = () => {
    return admin !== null && (admin.role === 'admin' || admin.role === 'super_admin')
  }

  const value = {
    admin,
    loading,
    isAdmin,
    adminLogin,
    adminLogout,
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}
