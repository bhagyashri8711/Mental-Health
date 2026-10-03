import "../utils/chartConfig";
import { Line, Doughnut } from "react-chartjs-2";
import { moodTrendChartData, moodDistributionData } from "../data/moodData";
import { FiTrendingUp, FiPieChart, FiSun } from "react-icons/fi";

export default function MoodChart({ moods = [] }) {
  // Compute metrics from moods array if available
  const totalCount = moods.length || 7;
  const avgScore = moods.length
    ? (moods.reduce((acc, m) => acc + (m.score || 5), 0) / moods.length).toFixed(1)
    : "7.4";

  return (
    <div className="space-y-6">
      {/* 14-Day Mood Wellness Trend Line Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FiTrendingUp className="text-teal-600" /> 14-Day Mood Trend Analysis
            </h3>
            <p className="text-xs text-slate-500">Track your emotional wellness over time</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-teal-600">{avgScore}/10</span>
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Avg Score</p>
          </div>
        </div>

        <div className="h-60">
          <Line
            data={moodTrendChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) => `Wellness Score: ${context.raw}/10`,
                  },
                },
              },
              scales: {
                y: {
                  min: 0,
                  max: 10,
                  grid: { color: "#f1f5f9" },
                },
                x: {
                  grid: { display: false },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Grid for Distribution & Insight */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Doughnut Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
              <FiPieChart className="text-indigo-600" /> Mood Breakdown
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">Frequency of logged emotions</p>
          </div>
          <div className="h-44 flex items-center justify-center">
            <Doughnut
              data={moodDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "right", labels: { boxWidth: 10, font: { size: 10 } } },
                },
                cutout: "65%",
              }}
            />
          </div>
        </div>

        {/* Mood Insights Box */}
        <div className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between border border-teal-800/50">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-bold border border-teal-500/30">
              <FiSun size={13} /> AI Wellness Insight
            </span>
            <h4 className="text-base font-bold text-teal-100">Positive Trigger Correlation</h4>
            <p className="text-xs text-teal-200/80 leading-relaxed">
              Your overall mood improves by <strong className="text-emerald-400">+38%</strong> on days when you log both <strong className="text-white">#Meditation</strong> and <strong className="text-white">#Exercise</strong>.
            </p>
          </div>

          <div className="pt-3 border-t border-teal-800/60 flex items-center justify-between text-[11px] text-teal-300">
            <span>Logged Entries: <strong>{totalCount}</strong></span>
            <span className="font-bold text-emerald-400">🔥 7 Day Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
}