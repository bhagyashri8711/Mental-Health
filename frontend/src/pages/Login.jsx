import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";
import { FiLock, FiMail, FiArrowRight, FiShield, FiUsers, FiUser } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      toast.success("Welcome back to MindConnect!");
      navigate("/dashboard");
    } catch {
      // If error occurs, fallback to demo mode
      loginAsDemo("Member");
      toast.success("Logged in via Demo Mode!");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  const handleQuickDemo = (role) => {
    loginAsDemo(role);
    toast.success(`Logged in as ${role}!`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
            🧠
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">MindConnect</h1>
          <p className="text-xs text-slate-400">Mental Health Peer Support & Wellness</p>
        </div>

        {/* Form */}
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-800/80 text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-800/80 text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
          >
            <span>Sign In</span> <FiArrowRight size={16} />
          </button>
        </form>

        {/* Quick Demo Access Section */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <p className="text-center text-[11px] font-bold text-teal-400 uppercase tracking-wider">
            ⚡ Quick Demo Instant Access
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("Member")}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-bold transition flex flex-col items-center gap-1"
            >
              <FiUser className="text-teal-400" size={16} />
              <span>Demo User</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo("Peer Listener")}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-bold transition flex flex-col items-center gap-1"
            >
              <FiUsers className="text-emerald-400" size={16} />
              <span>Peer Listener</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo("Admin")}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-bold transition flex flex-col items-center gap-1"
            >
              <FiShield className="text-indigo-400" size={16} />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-400 font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}