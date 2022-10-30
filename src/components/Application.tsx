import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StateLoading } from './StateLoading'
import { NavigationBar } from './NavigationBar'
import { LearnTodayPage } from '../pages/LearnTodayPage'
import { ProgressPage } from '../pages/ProgressPage'

export const Application = () => {
  return (
    <Container className='h-100 d-flex flex-column align-items-center pt-3'>
      <StateLoading>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<LearnTodayPage />} />
          <Route path='/progress' element={<ProgressPage />} />
        </Routes>
      </StateLoading>
    </Container>
  )
}



