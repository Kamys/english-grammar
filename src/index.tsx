import React from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Application } from './components/Application'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root')

createRoot(root).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
)
