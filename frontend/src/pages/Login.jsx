import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldAlert, User, Lock, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import Logo from "../components/Logo";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      setError("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password === "") {
      setError("Please enter your password.");
      return;
    }

    // Demo Login
    if (email === "admin@cricpro.com" && password === "admin123") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] px-4 sm:px-6 lg:px-8 overflow-hidden pt-12 transition-colors duration-300">
      
      {/* Stadium backdrop layer */}
      <div className="stadium-silhouette" />

      {/* Background Stadium Glows */}
      <div className="stadium-glow top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2" />
      <div className="stadium-glow bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        
        {/* Logo and Headings */}
        <div className="text-center flex flex-col items-center">
          <Link to="/" className="inline-flex items-center gap-2 group mb-4">
            <Logo className="h-12 w-auto" />
          </Link>
          <h2 className="font-display font-extrabold text-2xl text-slate-800 dark:text-slate-200">Welcome Back</h2>
          <p className="font-sans text-xs text-slate-500 dark:text-slate-450 mt-1.5">
            Log in to access your cricket administration dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl border border-slate-250 dark:border-slate-800/80 p-8 shadow-2xl relative">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-highlight rounded-t-2xl" />
          
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="email"
                  placeholder="admin@cricpro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-250 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Password</label>
                <a href="#" className="text-[10px] text-accent dark:text-highlight hover:underline font-bold">Forgot?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-250 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded text-accent bg-slate-150 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-accent"
                />
                Remember Me
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-danger text-xs rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              Sign In to Admin Panel
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-850 text-center space-y-1 bg-slate-100/50 dark:bg-slate-900/20 p-3 rounded-xl border border-slate-200 dark:border-slate-850/50">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Demo Credentials</span>
            <div className="text-[11px] text-slate-655 dark:text-slate-350">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Email:</span> admin@cricpro.com
            </div>
            <div className="text-[11px] text-slate-655 dark:text-slate-350">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Password:</span> admin123
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;