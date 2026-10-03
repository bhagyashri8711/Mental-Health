import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MoodForm from "../components/MoodForm";
import MoodHistory from "../components/MoodHistory";
import MoodChart from "../components/MoodChart";
import { initialMoodLogs } from "../data/moodData";
import { getMoods } from "../services/moodService";
import { FiSmile, FiHeart, FiActivity } from "react-icons/fi";

export default function MoodTracker() {
  const [moods, setMoods] = useState(initialMoodLogs);

  async function loadMoods() {
    try {
      const { data } = await getMoods();
      if (data && data.length > 0) {
        // Merge Supabase entries with mock data for rich experience
        const mapped = data.map((d) => ({
          id: d.id,
          mood: d.mood,
          score: 8,
          emoji: d.mood === "great" ? "😄" : d.mood === "good" ? "🙂" : "😐",
          note: d.note,
          tags: ["#CheckIn"],
          created_at: d.created_at,
          formattedDate: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }));
        setMoods([...mapped, ...initialMoodLogs]);
      }
    } catch {
      // Fallback to initial mock logs
    }
  }

  const handleAddMood = (newEntry) => {
    setMoods([newEntry, ...moods]);
  };

  useEffect(() => {
    loadMoods();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 p-8 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-md border border-white/10">
                <FiActivity size={14} /> Emotional Intelligence Tracker
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                Daily Mood Tracker & Analytics 😊
              </h1>
              <p className="text-emerald-100/90 text-sm lg:text-base leading-relaxed">
                Log your daily mood, track activity triggers, and discover trends in your mental wellness over time.
              </p>
            </div>
            {/* Background Glow */}
            <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-teal-400/20 blur-2xl" />
          </div>

          {/* Form & Analytics Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <MoodForm onAddMood={handleAddMood} refresh={loadMoods} />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <MoodChart moods={moods} />
            </div>
          </div>

          {/* History Timeline */}
          <div>
            <MoodHistory moods={moods} />
          </div>
        </main>
      </div>
    </div>
  );
}