import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../utils/chartConfig"; // Ensure Chart.js is registered
import { Line, Doughnut } from "react-chartjs-2";
import {
  peerSupportStats,
  weeklyActivityData,
  topicBreakdownData,
  activeListenersRoster,
  supportRequestsFeed as initialRequests,
  virtualPeerCircles,
} from "../data/peerData";
import {
  FiUsers,
  FiClock,
  FiHeart,
  FiStar,
  FiMessageCircle,
  FiPlusCircle,
  FiCalendar,
  FiShield,
  FiCheckCircle,
  FiSend,
  FiX,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function PeerSupport() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [connectModalPeer, setConnectModalPeer] = useState(null);
  const [newRequestModal, setNewRequestModal] = useState(false);
  const [newRequestText, setNewRequestText] = useState("");
  const [newRequestCategory, setNewRequestCategory] = useState("Anxiety & Panic");

  // Interaction handlers
  const handleSupportAction = (id, type) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          if (type === "offer") {
            toast.success("Support offer sent to " + req.userAlias + "!");
            return { ...req, offersCount: req.offersCount + 1 };
          }
          if (type === "hug") {
            toast.success("Virtual hug sent! 🤗");
            return { ...req, hugsCount: req.hugsCount + 1 };
          }
          if (type === "encourage") {
            toast.success("Encouragement sent! 💪");
            return { ...req, encouragementsCount: req.encouragementsCount + 1 };
          }
        }
        return req;
      })
    );
  };

  const handlePostRequest = (e) => {
    e.preventDefault();
    if (!newRequestText.trim()) return;

    const newReq = {
      id: "req_" + Date.now(),
      userAlias: "You (Anonymous)",
      avatarBg: "bg-teal-600",
      category: newRequestCategory,
      timeAgo: "Just now",
      text: newRequestText,
      offersCount: 0,
      hugsCount: 1,
      encouragementsCount: 0,
      urgent: false,
    };

    setRequests([newReq, ...requests]);
    setNewRequestText("");
    setNewRequestModal(false);
    toast.success("Your peer support request has been published securely!");
  };

  const filteredListeners = selectedTopic === "All"
    ? activeListenersRoster
    : activeListenersRoster.filter(l => l.specialities.some(s => s.toLowerCase().includes(selectedTopic.toLowerCase())));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-800 p-8 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-md border border-white/10">
                <FiShield size={14} /> 100% Anonymous & Safe Peer Network
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                Peer Support & Listening Hub 💬
              </h1>
              <p className="text-teal-100/90 text-sm lg:text-base leading-relaxed">
                Connect with verified empathetic peer listeners, join live group listening circles, or request one-on-one support when you need someone who understands.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setNewRequestModal(true)}
                  className="px-5 py-2.5 bg-white text-teal-800 hover:bg-teal-50 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <FiPlusCircle size={18} /> Request Peer Support
                </button>
                <a
                  href="#active-listeners"
                  className="px-5 py-2.5 bg-teal-800/60 hover:bg-teal-800 text-white rounded-xl font-semibold text-sm backdrop-blur-md transition flex items-center gap-2 border border-white/20"
                >
                  <FiUsers size={18} /> Find Online Listeners
                </a>
              </div>
            </div>

            {/* Background Decorative Circles */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/20 blur-2xl" />
            <div className="absolute right-40 -top-10 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl" />
          </div>

          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                <FiUsers size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Active Listeners</p>
                <p className="text-2xl font-extrabold text-slate-800">{peerSupportStats.activeListeners}</p>
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Online Now
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <FiHeart size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Peers Helped</p>
                <p className="text-2xl font-extrabold text-slate-800">{peerSupportStats.totalPeersHelped}+</p>
                <p className="text-[11px] text-indigo-600 font-semibold">This Month</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <FiClock size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Avg Response Time</p>
                <p className="text-2xl font-extrabold text-slate-800">{peerSupportStats.avgResponseTimeMs}</p>
                <p className="text-[11px] text-amber-600 font-semibold">Ultra Fast</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <FiStar size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Satisfaction Rate</p>
                <p className="text-2xl font-extrabold text-slate-800">{peerSupportStats.satisfactionRate}</p>
                <p className="text-[11px] text-rose-600 font-semibold">Verified Ratings</p>
              </div>
            </div>
          </div>

          {/* Peer Support Analytics Charts Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart 1: Weekly Support Activity */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    📈 Peer Support Activity & Volume
                  </h3>
                  <p className="text-xs text-slate-500">Weekly completed sessions vs new peer requests</p>
                </div>
                <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200">
                  Updated Live
                </span>
              </div>
              <div className="h-64">
                <Line
                  data={weeklyActivityData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                    },
                    scales: {
                      y: { grid: { color: "#f1f5f9" } },
                      x: { grid: { display: false } },
                    },
                  }}
                />
              </div>
            </div>

            {/* Chart 2: Support Topic Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  📊 Support Topic Categories
                </h3>
                <p className="text-xs text-slate-500 mb-4">Distribution of peer support conversations</p>
              </div>
              <div className="h-56 flex items-center justify-center">
                <Doughnut
                  data={topicBreakdownData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } },
                    },
                    cutout: "68%",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Active Verified Peer Supporters Section */}
          <div id="active-listeners" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  🤝 Active Verified Peer Listeners
                </h2>
                <p className="text-xs text-slate-500">Connect with trained peers ready to listen confidentially</p>
              </div>

              {/* Topic Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["All", "Anxiety", "Depression", "Sleep", "Stress"].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      selectedTopic === topic
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Roster Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredListeners.map((peer) => (
                <div
                  key={peer.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header: Avatar & Online Status */}
                    <div className="flex items-start justify-between">
                      <div className="relative">
                        <img
                          src={peer.avatar}
                          alt={peer.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/20 group-hover:scale-105 transition"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                            peer.status === "online" ? "bg-emerald-500 pulse-online" : "bg-amber-500"
                          }`}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                        {peer.badge}
                      </span>
                    </div>

                    {/* Listener Details */}
                    <div>
                      <h4 className="font-bold text-slate-800 text-base leading-snug">{peer.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{peer.role}</p>
                      <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-bold">
                        <FiStar size={14} className="fill-amber-400" />
                        <span>{peer.rating}</span>
                        <span className="text-slate-400 font-normal">({peer.sessionsCompleted} sessions)</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{peer.bio}</p>

                    {/* Specialities tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {peer.specialities.map((spec, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          #{spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connect Action Button */}
                  <div className="pt-5 border-t border-slate-100 mt-4">
                    <button
                      onClick={() => setConnectModalPeer(peer)}
                      className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle size={15} /> Start Private Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Support Requests Feed & Virtual Circles */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Support Requests Feed */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    📢 Peer Support Request Feed
                  </h3>
                  <p className="text-xs text-slate-500">Respond with encouragement or offer a private session</p>
                </div>
                <button
                  onClick={() => setNewRequestModal(true)}
                  className="px-3.5 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <FiPlusCircle size={15} /> Post Request
                </button>
              </div>

              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3 hover:border-teal-300 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${req.avatarBg} text-white font-bold text-xs flex items-center justify-center`}>
                          {req.userAlias.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{req.userAlias}</p>
                          <p className="text-[11px] text-slate-400">{req.timeAgo}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {req.category}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-normal">{req.text}</p>

                    {/* Action Counters */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs">
                      <button
                        onClick={() => handleSupportAction(req.id, "offer")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold transition"
                      >
                        💬 Offer Chat ({req.offersCount})
                      </button>

                      <button
                        onClick={() => handleSupportAction(req.id, "hug")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition"
                      >
                        🤗 Send Hug ({req.hugsCount})
                      </button>

                      <button
                        onClick={() => handleSupportAction(req.id, "encourage")}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold transition"
                      >
                        💪 Encourage ({req.encouragementsCount})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtual Peer Circles Sidebar */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  🎙️ Upcoming Peer Circles
                </h3>
                <p className="text-xs text-slate-500">Scheduled group listening & mindfulness rooms</p>
              </div>

              <div className="space-y-4">
                {virtualPeerCircles.map((circle) => (
                  <div key={circle.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-800 text-sm">{circle.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 whitespace-nowrap">
                        Live Circle
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FiCalendar size={14} className="text-teal-600" />
                      <span>{circle.time}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <img src={circle.hostAvatar} alt={circle.host} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs text-slate-700 font-medium">Host: {circle.host}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>
                        <strong className="text-slate-800">{circle.participants}</strong>/{circle.maxCapacity} Seats Filled
                      </span>
                      <button
                        onClick={() => toast.success(`RSVP confirmed for "${circle.title}"!`)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-xs transition"
                      >
                        Join Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Connect Modal */}
        {connectModalPeer && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 relative">
              <button
                onClick={() => setConnectModalPeer(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <FiX size={20} />
              </button>

              <div className="text-center space-y-2">
                <img
                  src={connectModalPeer.avatar}
                  alt={connectModalPeer.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto border-4 border-teal-500/20 shadow-md"
                />
                <h3 className="text-xl font-extrabold text-slate-800">{connectModalPeer.name}</h3>
                <p className="text-xs font-semibold text-teal-600">{connectModalPeer.role}</p>
              </div>

              <p className="text-xs text-slate-600 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{connectModalPeer.bio}"
              </p>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700">What would you like to discuss?</label>
                <textarea
                  rows={3}
                  placeholder="Share a brief note to start your anonymous session..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setConnectModalPeer(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setConnectModalPeer(null);
                    toast.success("Private session request sent! Connecting in secure chat...");
                  }}
                  className="flex-1 py-2.5 bg-teal-600 text-white hover:bg-teal-700 rounded-xl text-xs font-bold shadow-md transition"
                >
                  Request Session
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Support Request Modal */}
        {newRequestModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
              <button
                onClick={() => setNewRequestModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <FiX size={20} />
              </button>

              <div>
                <h3 className="text-xl font-extrabold text-slate-800">Request Anonymous Peer Support</h3>
                <p className="text-xs text-slate-500">Your identity will remain completely anonymous</p>
              </div>

              <form onSubmit={handlePostRequest} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newRequestCategory}
                    onChange={(e) => setNewRequestCategory(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-medium"
                  >
                    <option>Anxiety & Panic</option>
                    <option>Work & Life Stress</option>
                    <option>Sleep & Relaxation</option>
                    <option>Depression & Low Energy</option>
                    <option>Academic Pressure</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">What's on your mind?</label>
                  <textarea
                    rows={4}
                    required
                    value={newRequestText}
                    onChange={(e) => setNewRequestText(e.target.value)}
                    placeholder="Describe how you're feeling or what support you need right now..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewRequestModal(false)}
                    className="flex-1 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl text-xs font-bold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                  >
                    <FiSend size={15} /> Publish Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}