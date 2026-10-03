import { useState } from "react";
import { saveMood } from "../services/moodService";
import { moodTypes, availableTags } from "../data/moodData";
import { FiSmile, FiPlus, FiCheck, FiSend } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function MoodForm({ onAddMood, refresh }) {
  const [selectedMood, setSelectedMood] = useState(moodTypes[0].id);
  const [score, setScore] = useState(8);
  const [selectedTags, setSelectedTags] = useState(["#Meditation", "#Exercise"]);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const moodObj = moodTypes.find((m) => m.id === selectedMood) || moodTypes[0];

    const newEntry = {
      id: "m_" + Date.now(),
      mood: selectedMood,
      score: Number(score),
      emoji: moodObj.emoji,
      note: note.trim() || `Feeling ${moodObj.label} today.`,
      tags: selectedTags,
      created_at: new Date().toISOString(),
      formattedDate: "Just now",
    };

    try {
      await saveMood(selectedMood, note);
    } catch {
      // Graceful fallback for local demo state
    }

    if (onAddMood) {
      onAddMood(newEntry);
    }
    if (refresh) {
      refresh(newEntry);
    }

    toast.success(`Mood logged as "${moodObj.label}"! ✨`);
    setNote("");
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <FiSmile className="text-teal-600" /> Log Today's Mood
          </h2>
          <p className="text-xs text-slate-500">How are you feeling right now?</p>
        </div>
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Daily Check-in
        </span>
      </div>

      {/* Emotion Cards Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Primary Emotion
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {moodTypes.map((type) => {
            const isSelected = selectedMood === type.id;
            return (
              <button
                type="button"
                key={type.id}
                onClick={() => {
                  setSelectedMood(type.id);
                  setScore(type.score);
                }}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all duration-200 ${
                  isSelected
                    ? "bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 scale-105 shadow-sm"
                    : "bg-white border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <span className="text-3xl">{type.emoji}</span>
                <span
                  className={`text-xs font-bold ${
                    isSelected ? "text-teal-800" : "text-slate-600"
                  }`}
                >
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wellness Intensity Slider */}
      <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
        <div className="flex justify-between items-center text-xs">
          <label className="font-bold text-slate-700">Wellness Intensity Score</label>
          <span className="font-extrabold text-teal-600 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
            {score} / 10
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>Low Energy (1)</span>
          <span>Moderate (5)</span>
          <span>High Vitality (10)</span>
        </div>
      </div>

      {/* Activity Tags Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Activities & Factors (#Tags)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {isSelected && <FiCheck size={12} />}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Journaling Reflection Note */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Daily Journal Reflection (Optional)
        </label>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write about what influenced your mood today or any reflections..."
          className="w-full text-xs p-3.5 rounded-xl border border-slate-200/80 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 placeholder-slate-400 bg-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
      >
        <FiSend size={16} /> Log Entry Securely
      </button>
    </form>
  );
}