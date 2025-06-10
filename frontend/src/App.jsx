import { useState } from 'react'
import './App.css'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'



function App() {

  
  return (
    <Router>
      <>
        <HelmetProvider>
          <Header/>
          <ToastContainer theme='dark'/>
          <Routes>
            <Route path='/' element={<Home/>}>
            </Route>
          </Routes>
          <Footer/>
        </HelmetProvider>
      </>
    </Router>
  )
}

export default App
