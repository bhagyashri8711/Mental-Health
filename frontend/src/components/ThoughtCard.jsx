import { useState } from "react";
import { FiRefreshCw, FiSun } from "react-icons/fi";

const thoughts = [
  { text: "You are stronger than you think. Every step forward is a victory.", author: "Mindfulness Wisdom" },
  { text: "It's okay not to be okay every single day. Rest is part of the growth process.", author: "Dr. Alex Chen" },
  { text: "Small, consistent acts of self-care build an unshakeable inner calm.", author: "Daily Affirmation" },
  { text: "Your feelings are valid. Giving yourself permission to feel is healing.", author: "Empathy Circle" },
  { text: "Peace begins when expectation ends and gratitude takes its place.", author: "Mindful Living" },
];

export default function ThoughtCard() {
  const [index, setIndex] = useState(0);

  const nextThought = () => {
    setIndex((prev) => (prev + 1) % thoughts.length);
  };

  const current = thoughts[index];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between border border-indigo-700/40">
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold border border-indigo-400/30 backdrop-blur-md">
            <FiSun size={14} className="text-amber-400" /> Daily Inspiration
          </span>
          <button
            onClick={nextThought}
            className="p-1.5 rounded-lg bg-indigo-800/50 hover:bg-indigo-700 text-indigo-200 transition"
            title="Next Affirmation"
          >
            <FiRefreshCw size={14} />
          </button>
        </div>

        <p className="text-base lg:text-lg font-medium leading-relaxed italic text-indigo-100">
          "{current.text}"
        </p>
      </div>

      <div className="pt-4 mt-2 border-t border-indigo-800/60 flex items-center justify-between text-xs text-indigo-300 relative z-10 font-semibold">
        <span>— {current.author}</span>
        <span className="text-[11px] text-amber-400">✨ MindConnect Affirmation</span>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-purple-500/20 blur-2xl" />
    </div>
  );
}