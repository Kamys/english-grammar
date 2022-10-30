import React from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Application } from './components/Application'
import { createRoot } from 'react-dom/client'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

const root = document.getElementById('root')

createRoot(root).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
)
