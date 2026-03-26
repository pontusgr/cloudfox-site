import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cloudfox from './Cloudfox.jsx'
import Analys from './Analys.jsx'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cloudfox />} />
        <Route path="/analys" element={<Analys />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
