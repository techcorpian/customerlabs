import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Screen from './view/pages/Screen';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Screen />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
