import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SimplifierDashboard from '../simplifier/SimplifierDashboard'

export default function RoutesIndex() {
  return (
    <Routes>
        <Route path="/*" element={<SimplifierDashboard />} />
    </Routes>
  )
}
