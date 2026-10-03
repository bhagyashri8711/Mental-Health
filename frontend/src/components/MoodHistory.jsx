import { useState } from "react";
import { FiClock, FiSearch, FiCalendar, FiTag, FiSmile } from "react-icons/fi";

export default function MoodHistory({ moods = [] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredMoods = moods.filter((item) => {
    const matchesSearch =
      (item.note || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.mood || "").toLowerCase().includes(search.toLowerCase());
    const matchesTag =
      selectedTag === "All" || (item.tags && item.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <FiClock className="text-teal-600" /> Reflection History Timeline
          </h2>
          <p className="text-xs text-slate-500">Your past logs and emotional reflections</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-2.5 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search notes or emotions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
          />
        </div>
      </div>

      {/* History Timeline */}
      {filteredMoods.length === 0 ? (
        <div className="text-center py-12 space-y-2">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
            <FiSmile />
          </div>
          <p className="text-sm font-bold text-slate-700">No matching mood logs found</p>
          <p className="text-xs text-slate-400">Try adjusting your search query or log a new mood above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMoods.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xs transition duration-200 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji || "🙂"}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 capitalize">
                      {item.mood} Entry
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <FiCalendar size={12} />
                      {item.formattedDate || new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    Score: {item.score || 7}/10
                  </span>
                </div>
              </div>

              {item.note && (
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                  "{item.note}"
                </p>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md border border-teal-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}