import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";
import { FiSearch, FiUser, FiSettings, FiLogOut, FiActivity, FiShield } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Navbar() {
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Friend";

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/resources?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-6 py-3.5 flex justify-between items-center shadow-xs">
      {/* Left: Greeting & Search */}
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Welcome back, <span className="text-teal-600 font-extrabold">{userName}</span> 👋
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Status: Calm & Focused
            </span>
            <span className="text-xs text-slate-400 font-medium">| {new Date().toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative ml-4">
          <FiSearch className="absolute left-3.5 text-slate-400" size={17} />
          <input
            type="text"
            placeholder="Search topics, resources, peers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-700 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 w-64 lg:w-80 transition"
          />
        </form>
      </div>

      {/* Right Section: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <NotificationBell />

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent focus:border-slate-200"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-indigo-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-slate-800 leading-tight">{userName}</p>
              <p className="text-xs text-teal-600 font-semibold">Verified Member</p>
            </div>
          </button>

          {/* Profile Dropdown Drawer */}
          {profileOpen && (
            <>
              <div onClick={() => setProfileOpen(false)} className="fixed inset-0 z-40" />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-800">{userName}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 rounded-xl font-medium transition"
                  >
                    <FiUser size={16} /> My Wellness Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 rounded-xl font-medium transition"
                  >
                    <FiSettings size={16} /> Settings
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition"
                  >
                    <FiShield size={16} /> Admin Portal
                  </Link>
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition text-left"
                  >
                    <FiLogOut size={16} /> Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}