import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
Eye,
EyeOff,
User,
Mail,
Lock,
ArrowRight,
Sparkles,
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Register() {
const navigate = useNavigate()

const [formData, setFormData] = useState({
name: '',
email: '',
password: '',
confirmPassword: '',
})

const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [success, setSuccess] = useState('')

const handleChange = (e) => {
const { name, value } = e.target

setFormData((prev) => ({
  ...prev,
  [name]: value,
}))

if (error) setError('')

}

const handleSubmit = async (e) => {
e.preventDefault()
setError('')
setSuccess('')

const name = formData.name.trim()
const email = formData.email.trim().toLowerCase()
const { password, confirmPassword } = formData

if (name.length < 2 || name.length > 80) {
  setError('Name must be between 2 and 80 characters.')
  return
}

if (password !== confirmPassword) {
  setError('Passwords do not match.')
  return
}

if (password.length < 8 || password.length > 72) {
  setError('Password must be between 8 and 72 characters.')
  return
}

try {
  setLoading(true)

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Registration failed. Please try again.')
  }

  if (!data.token || !data.user) {
    throw new Error(
      'Account created, but the authentication response is incomplete. Please try logging in.'
    )
  }

  // Save the authentication details for subsequent API requests.
  try {
    localStorage.setItem('buzzifyToken', data.token)
    localStorage.setItem('buzzifyUser', JSON.stringify(data.user))
  } catch {
    throw new Error(
      'Your account was created, but this browser could not save your login. Please try logging in again.'
    )
  }

  setSuccess('Account created successfully! Redirecting...')

  setTimeout(() => {
    navigate('/')
  }, 1000)
} catch (err) {
  if (err.message === 'Failed to fetch') {
    setError(
      'Unable to connect to the server. Make sure the backend is running and CORS is configured.'
    )
  } else {
    setError(err.message || 'Something went wrong. Please try again.')
  }
} finally {
  setLoading(false)
}

}

const inputClass =
'w-full rounded-xl border border-white/10 bg-[#1D1D1D] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder/30 focus:border-[#D4AF37]/70 focus focus:ring-[#D4AF37]/30'

return (
<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#171717] px-4 py-16 text-white sm:px-6">
{/* Background glow */}
<div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
<div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative w-full max-w-md"
  >
    {/* Page heading */}
    <div className="mb-8 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
        <Sparkles className="h-7 w-7 text-[#D4AF37]" />
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
        Welcome to Buzzify
      </p>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Create your account
      </h1>

      <p className="mt-3 text-sm leading-6 text-white/50">
        Join us and take the next step in growing your brand.
      </p>
    </div>

    {/* Registration card */}
    <div className="rounded-2xl border border-white/10 bg-[#202020]/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300"
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Full name
          </label>

          <div className="relative">
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              minLength={2}
              maxLength={80}
              required
            />
          </div>
        </div>

        {/* Email address */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Email address
          </label>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Password
          </label>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              minLength={8}
              maxLength={72}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-[#D4AF37]"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Confirm password
          </label>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClass}
              minLength={8}
              maxLength={72}
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? 'Hide confirm password'
                  : 'Show confirm password'
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-[#D4AF37]"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || Boolean(success)}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-sm font-semibold text-[#171717] transition duration-300 hover:bg-[#E5C158] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create account'}

          {!loading && (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </form>

      <div className="my-6 h-px bg-white/10" />

      <p className="text-center text-sm text-white/50">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-[#D4AF37] transition hover:text-[#E5C158]"
        >
          Sign in
        </Link>
      </p>
    </div>

    <p className="mt-6 text-center text-xs text-white/30">
      By creating an account, you agree to Buzzify&apos;s terms and privacy
      policy.
    </p>
  </motion.div>
</main>

)
}