import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import {
  FiHome,
  FiSmile,
  FiBookOpen,
  FiUsers,
  FiMessageSquare,
  FiUser,
  FiSettings,
  FiShield,
  FiLogOut,
  FiPhoneCall,
  FiMenu,
  FiX,
  FiCpu,
  FiZap,
} from "react-icons/fi";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "Mood Tracker", path: "/mood", icon: FiSmile, badge: "Daily" },
    { name: "Peer Support", path: "/support", icon: FiUsers, badge: "Live" },
    { name: "AI Companion", path: "/ai-chat", icon: FiCpu, badge: "24/7 AI" },
    { name: "Community Chat", path: "/chat", icon: FiMessageSquare, count: 5 },
    { name: "Resources", path: "/resources", icon: FiBookOpen },
    { name: "Profile", path: "/profile", icon: FiUser },
    { name: "Settings", path: "/settings", icon: FiSettings },
    { name: "Admin Portal", path: "/admin", icon: FiShield },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition"
        aria-label="Toggle Navigation"
      >
        {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-bold text-xl">
              🧠
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                MindConnect
                <span className="text-[10px] uppercase font-semibold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                  PRO
                </span>
              </h1>
              <p className="text-xs text-slate-400">Peer Support & Wellness</p>
            </div>
          </div>
        </div>

        {/* Streak Counter Card */}
        <div className="mx-4 mt-5 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-indigo-500/10 border border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
              🔥
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-300">7-Day Streak!</p>
              <p className="text-[11px] text-slate-400">Keep up the daily check-ins</p>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-400 bg-teal-500/20 px-2 py-1 rounded-md">
            +50 XP
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold shadow-lg shadow-teal-900/40 border border-teal-500/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={19} className="shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500 text-white">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Emergency Hotline Shortcut Card */}
        <div className="px-4 py-3">
          <a
            href="tel:988"
            className="block p-3.5 rounded-xl bg-gradient-to-r from-rose-950/60 to-rose-900/40 border border-rose-800/50 hover:border-rose-600 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center group-hover:scale-110 transition shrink-0">
                <FiPhoneCall size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-200">Need Immediate Help?</p>
                <p className="text-[11px] text-rose-300/80">24/7 Helpline: Call 988</p>
              </div>
            </div>
          </a>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition font-medium text-sm"
          >
            <FiLogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}