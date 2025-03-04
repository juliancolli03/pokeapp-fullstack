import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorites from './pages/Favorites'
import PokemonDetails from './pages/PokemonDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
        <NavBar />
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<ProtectedRoute component={Favorites} />} />
            <Route path="/pokemon/:name" element={<PokemonDetails />} />
          </Routes>
        </div>
    </Router>
  )
}

export default App
