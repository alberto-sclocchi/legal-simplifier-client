import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LegalSimplifier from '../simplifier/LegalSimplifier'

export default function RoutesIndex() {
  return (
    <Routes>
        <Route path="/*" element={<LegalSimplifier />} />
    </Routes>
  )
}
