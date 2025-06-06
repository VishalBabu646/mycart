import { useState } from 'react'
import './App.css'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'

function App() {

  
  return (
    <Router>
      <>
        <HelmetProvider>
          <Header/>
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
