import { useState } from "react";
import { moodTypes } from "../data/moodData";
import { toast } from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";

export default function MoodSelector() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type.id);
    toast.success(`Logged as ${type.label} ${type.emoji}! Saved to daily log.`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">Quick Mood Check-in</h3>
          <p className="text-xs text-slate-500">Tap your current emotional state</p>
        </div>
        {selected && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <FiCheckCircle size={13} /> Saved
          </span>
        )}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {moodTypes.map((type) => {
          const isSelected = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => handleSelect(type)}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                isSelected
                  ? "bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 scale-105"
                  : "bg-slate-50/60 border-slate-200/80 hover:bg-slate-100 hover:scale-105"
              }`}
            >
              <span className="text-2xl">{type.emoji}</span>
              <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}