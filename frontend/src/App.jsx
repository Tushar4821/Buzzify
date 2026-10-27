
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/footer.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Work from './pages/Work.jsx'

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
        <Route path="/service" element={<Services />} />
        <Route path="/portfolio" element={<Work />} />
        <Route path="/about" element={<About />} />
       <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <Footer/>
    </>
  )
}
