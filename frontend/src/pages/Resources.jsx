import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { resourceCategories, resourcesList, emergencyHotlines } from "../data/resourceData";
import {
  FiBookOpen,
  FiSearch,
  FiPhoneCall,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiClock,
  FiCheckCircle,
  FiX,
  FiUser,
  FiStar,
  FiShare2,
  FiAward,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Resources() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modals state
  const [readingArticle, setReadingArticle] = useState(null);
  const [listeningAudio, setListeningAudio] = useState(null);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const filtered = resourcesList.filter((res) => {
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Audio Handlers
  const handleOpenAudio = (res) => {
    setListeningAudio(res);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 p-8 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md border border-white/10">
                <FiBookOpen size={14} /> Evidence-Based Mental Health Library
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                Mental Health Resources & Audio Guides 📚
              </h1>
              <p className="text-purple-100/90 text-sm lg:text-base leading-relaxed">
                Click any guide to read full step-by-step instructions or listen to guided voice meditations directly.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-purple-500/20 blur-2xl" />
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-3.5 top-3 text-slate-400" size={17} />
              <input
                type="text"
                placeholder="Search articles, audio, topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {resourceCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Card Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={res.image}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-purple-800 font-bold text-[10px] backdrop-blur-md">
                      {res.category}
                    </span>
                    {res.popular && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px]">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <FiClock size={13} />
                      <span>{res.readTime}</span>
                      <span>•</span>
                      <span>{res.type}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-800 group-hover:text-purple-600 transition leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {res.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                  {res.audioUrl ? (
                    <button
                      onClick={() => handleOpenAudio(res)}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                    >
                      <FiPlay size={14} /> Listen to Audio
                    </button>
                  ) : (
                    <button
                      onClick={() => setReadingArticle(res)}
                      className="w-full py-2.5 bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 border border-slate-200"
                    >
                      <FiBookOpen size={14} /> Read Guide
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Crisis Hotlines Directory */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl border border-slate-800">
            <div>
              <h2 className="text-2xl font-extrabold flex items-center gap-2 text-rose-400">
                <FiPhoneCall /> 24/7 Crisis Support Hotlines
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                If you or someone you know is in immediate crisis, please reach out to these free confidential helplines.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyHotlines.map((hotline, idx) => (
                <div key={idx} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-md">
                    {hotline.country}
                  </span>
                  <h4 className="font-extrabold text-white text-xl">{hotline.number}</h4>
                  <p className="text-xs font-bold text-slate-200">{hotline.name}</p>
                  <p className="text-[11px] text-slate-400">{hotline.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Article Guide Reader Modal */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition"
              >
                <FiX size={22} />
              </button>

              {/* Modal Article Header */}
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {readingArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <FiClock size={13} /> {readingArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-800">{readingArticle.title}</h2>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <FiUser className="text-purple-600" />
                  <span>By {readingArticle.author || "MindConnect Mental Health Team"}</span>
                </div>
              </div>

              {/* Modal Article Image */}
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-56 rounded-2xl object-cover shadow-sm"
              />

              {/* Full Article Content */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed whitespace-pre-line font-normal">
                {readingArticle.content}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <FiAward size={15} /> Earn +20 XP upon reading
                </span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setReadingArticle(null);
                      toast.success("Guide marked as completed (+20 XP)! 🎉");
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <FiCheckCircle size={16} /> Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audio Player Modal */}
        {listeningAudio && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-800 animate-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setListeningAudio(null);
                  setIsPlaying(false);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition"
              >
                <FiX size={22} />
              </button>

              {/* Audio Cover & Details */}
              <div className="text-center space-y-3">
                <img
                  src={listeningAudio.image}
                  alt={listeningAudio.title}
                  className="w-28 h-28 rounded-2xl object-cover mx-auto shadow-lg border-2 border-purple-500/30"
                />
                <span className="inline-block px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  {listeningAudio.category}
                </span>
                <h3 className="text-xl font-extrabold text-white">{listeningAudio.title}</h3>
                <p className="text-xs text-slate-400">Voice Guide by {listeningAudio.author}</p>
              </div>

              {/* Hidden HTML5 Audio Element */}
              <audio
                ref={audioRef}
                src={listeningAudio.audioUrl}
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Player Progress Scrubber */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>0:00</span>
                  <span>{listeningAudio.readTime}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-white transition"
                >
                  {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                </button>

                <button
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-900/50 hover:scale-105 transition"
                >
                  {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} className="ml-1" />}
                </button>

                <button
                  onClick={() => toast.success("Audio guide bookmarked!")}
                  className="p-2 text-slate-400 hover:text-amber-400 transition"
                  title="Bookmark"
                >
                  <FiStar size={20} />
                </button>
              </div>

              {/* Transcript Accordion / Summary */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-line">
                <p className="font-bold text-white mb-1">Guided Relaxation Steps:</p>
                {listeningAudio.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}