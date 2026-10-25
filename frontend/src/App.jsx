
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/footer.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

function Placeholder({ title }) {
  return (
    <main className="min-h-screen bg-[#171717] px-6 py-24 text-center text-white">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="mt-4 text-white/50">Coming soon to Buzzify.</p>
    </main>
  )
}

function NotFound() {
  return <Placeholder title="404 — Page not found" />
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Placeholder title="Our Services" />} />
        <Route path="/portfolio" element={<Placeholder title="Our Work" />} />
       <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <Footer/>
    </>
  )
}
