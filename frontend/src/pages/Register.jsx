import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      navigate("/");
    } catch {
      // Demo fallback
      loginAsDemo("Member");
      toast.success("Demo Account initialized!");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
            🧠
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h1>
          <p className="text-xs text-slate-400">Join the MindConnect Safe Support Network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="text"
                name="fullName"
                placeholder="Jane Doe"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-800/80 text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
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
                name="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-800/80 text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
          >
            <FiCheckCircle size={16} />
            <span>{loading ? "Registering Account..." : "Complete Registration"}</span>
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2">
          Already have an account?{" "}
          <Link to="/" className="text-teal-400 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}