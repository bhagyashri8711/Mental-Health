import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ThoughtCard from "../components/ThoughtCard";
import MoodSelector from "../components/MoodSelector";
import "../utils/chartConfig";
import { Line } from "react-chartjs-2";
import { weeklyActivityData } from "../data/peerData";
import { getDashboardStats } from "../services/dashboardService";
import {
  FiSmile,
  FiUsers,
  FiBookOpen,
  FiMessageSquare,
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiZap,
} from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    moodCount: 14,
    supportCount: 5,
    resourcesRead: 8,
    activeListeners: 42,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        if (data) {
          setStats((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // Fallback to rich pre-loaded numbers
      }
    }
    loadStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Welcome Banner with Wellness Score Gauge */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-indigo-950 p-8 text-white shadow-xl border border-slate-800">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold backdrop-blur-md border border-teal-500/30">
                  <FiActivity size={14} /> Overall Wellness Index: 88%
                </span>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Welcome to MindConnect Hub 🧠
                </h1>
                <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
                  Your confidential peer support platform. Track your mood daily, connect with verified listeners, or explore curated mental health toolkits.
                </p>
              </div>

              {/* Score Gauge Ring */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-4 shrink-0">
                <div className="w-16 h-16 rounded-full border-4 border-teal-400 border-t-emerald-400 border-r-indigo-400 flex items-center justify-center font-extrabold text-xl text-teal-300 shadow-inner">
                  8.8
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">Wellness Score</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">+12% vs Last Week</p>
                  <p className="text-[10px] text-slate-400">Based on 14 check-ins</p>
                </div>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
          </div>

          {/* Quick Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatCard
              title="Mood Entries"
              value={stats.moodCount}
              subtitle="14-day history"
              icon={FiSmile}
              gradient="from-teal-600 to-emerald-600"
              badge="🔥 7-Day Streak"
            />
            <StatCard
              title="Support Requests"
              value={stats.supportCount}
              subtitle="Resolved sessions"
              icon={FiUsers}
              gradient="from-indigo-600 to-violet-600"
              badge="Verified Peers"
            />
            <StatCard
              title="Resources Read"
              value={stats.resourcesRead}
              subtitle="Toolkits completed"
              icon={FiBookOpen}
              gradient="from-purple-600 to-pink-600"
              badge="Saved Library"
            />
            <StatCard
              title="Active Listeners"
              value={stats.activeListeners}
              subtitle="Online right now"
              icon={FiHeart}
              gradient="from-emerald-600 to-teal-700"
              badge="Live Support"
            />
          </div>

          {/* Thought of the Day & Quick Check-in */}
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <ThoughtCard />
            <MoodSelector />
          </div>

          {/* Quick Action Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FiZap className="text-amber-500" /> Platform Quick Actions
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/mood"
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-400 transition group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    😊
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">Log Mood Entry</h3>
                  <p className="text-xs text-slate-500">Record emotional status & view 14-day charts</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-teal-600 gap-1 group-hover:translate-x-1 transition">
                  <span>Log Now</span> <FiArrowRight />
                </div>
              </Link>

              <Link
                to="/support"
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-400 transition group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    🤝
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">Peer Support Hub</h3>
                  <p className="text-xs text-slate-500">Connect with 42 online verified listeners</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-indigo-600 gap-1 group-hover:translate-x-1 transition">
                  <span>Connect Peers</span> <FiArrowRight />
                </div>
              </Link>

              <Link
                to="/chat"
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-400 transition group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    💬
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">Community Chat</h3>
                  <p className="text-xs text-slate-500">Join safe multi-channel group discussions</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-emerald-600 gap-1 group-hover:translate-x-1 transition">
                  <span>Join Chat</span> <FiArrowRight />
                </div>
              </Link>

              <Link
                to="/resources"
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-400 transition group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    📚
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">Resource Library</h3>
                  <p className="text-xs text-slate-500">Audio guides, panic techniques & crisis numbers</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-purple-600 gap-1 group-hover:translate-x-1 transition">
                  <span>Explore Library</span> <FiArrowRight />
                </div>
              </Link>
            </div>
          </div>

          {/* Mini Peer Activity Chart Preview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Weekly Community Activity</h3>
                <p className="text-xs text-slate-500">Peer support connections completed across the platform</p>
              </div>
              <Link to="/support" className="text-xs font-bold text-teal-600 hover:underline">
                View Full Peer Hub &rarr;
              </Link>
            </div>

            <div className="h-56">
              <Line
                data={weeklyActivityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "top" } },
                  scales: { y: { grid: { color: "#f1f5f9" } }, x: { grid: { display: false } } },
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}