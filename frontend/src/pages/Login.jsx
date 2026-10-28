
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = formData.email.trim().toLowerCase();
    const { password } = formData;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password.");
      }

      if (!data.token || !data.user) {
        throw new Error("Login response is incomplete. Please try again.");
      }

      // Store authentication details using your existing keys.
      try {
        localStorage.setItem("buzzifyToken", data.token);
        localStorage.setItem("buzzifyUser", JSON.stringify(data.user));
      } catch {
        throw new Error(
          "Login succeeded, but this browser could not save your session."
        );
      }

      setSuccess("Login successful! Welcome back.");

      // Redirect according to the role returned by the backend.
      const destination =
        data.user.role === "admin" ? "/admin" : "/";

      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 700);
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError(
          "Unable to connect to the server. Make sure the backend is running and CORS is configured."
        );
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#1D1D1D] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder/30 focus:border-[#D4AF37]/70 focus:ring-[#D4AF37]/30";

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
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
            <Sparkles className="h-7 w-7 text-[#D4AF37]" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Welcome back to Buzzify
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Sign in to your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/50">
            Sign in to explore our services and grow your brand.
          </p>
        </div>

        {/* Login card */}
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
            {/* Email */}
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || Boolean(success)}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-sm font-semibold text-[#171717] transition duration-300 hover:bg-[#E5C158] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}

              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <div className="my-6 h-px bg-white/10" />

          <p className="text-center text-sm text-white/50">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#D4AF37] transition hover:text-[#E5C158]"
            >
              Create account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          Your next big idea starts here.
        </p>
      </motion.div>
    </main>
  );
}
