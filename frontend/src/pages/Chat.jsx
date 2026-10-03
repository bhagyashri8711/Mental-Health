import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
  FiHash,
  FiSend,
  FiSmile,
  FiLock,
  FiUserCheck,
  FiUsers,
  FiSearch,
  FiPlus,
  FiHeart,
  FiThumbsUp,
  FiSun,
  FiShield,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

const initialChannels = [
  { id: "c1", name: "general-support", topic: "Open safe space for any mental health topic or casual check-in", icon: "💬" },
  { id: "c2", name: "daily-wins", topic: "Share small victories, gratitude, and progress milestones", icon: "✨" },
  { id: "c3", name: "mindfulness-tips", topic: "Breathing techniques, grounding exercises, and calm routines", icon: "🧘" },
  { id: "c4", name: "anxiety-safe-space", topic: "Dedicated room for managing panic, worry, and overthinking", icon: "🌱" },
  { id: "c5", name: "late-night-thoughts", topic: "Quiet support space for night owls and insomnia thoughts", icon: "🌙" },
];

const mockInitialMessages = {
  "c1": [
    {
      id: "m1",
      sender: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      role: "Certified Listener",
      text: "Welcome to the MindConnect Community Chat! Feel free to share what's on your mind or just read along safely.",
      time: "10:15 AM",
      reactions: { "❤️": 8, "🤗": 12, "🙏": 5 },
      isPeerListener: true,
    },
    {
      id: "m2",
      sender: "Anonymous Panda",
      avatar: null,
      role: "Member",
      text: "Had a pretty rough morning with anxiety, but practicing 4-7-8 breathing really helped bring me back to baseline.",
      time: "10:30 AM",
      reactions: { "❤️": 5, "💡": 3 },
      isPeerListener: false,
    },
    {
      id: "m3",
      sender: "Aisha Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      role: "Mindfulness Coach",
      text: "@Anonymous Panda So proud of you for using your grounding tools! Every small step counts. 🌱",
      time: "10:34 AM",
      reactions: { "🤗": 7, "✨": 9 },
      isPeerListener: true,
    },
  ],
  "c2": [
    {
      id: "m21",
      sender: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      role: "Peer Counselor",
      text: "Daily Win: Managed to complete my 20-minute morning meditation and step away from work email during lunch! What's your win today?",
      time: "9:00 AM",
      reactions: { "🎉": 14, "✨": 10 },
      isPeerListener: true,
    },
  ],
  "c3": [
    {
      id: "m31",
      sender: "Aisha Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      role: "Mindfulness Coach",
      text: "Quick Tip: Try the 5-4-3-2-1 technique whenever you feel overwhelmed. 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
      time: "Yesterday",
      reactions: { "💡": 18, "🙏": 15 },
      isPeerListener: true,
    },
  ],
};

const channelOnlineUsers = [
  { id: "u1", name: "Elena Rostova", role: "Certified Listener", status: "online", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
  { id: "u2", name: "Aisha Patel", role: "Mindfulness Coach", status: "online", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150" },
  { id: "u3", name: "Marcus Vance", role: "Peer Counselor", status: "online", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
  { id: "u4", name: "Liam O'Connor", role: "Student Life Supporter", status: "away", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
];

export default function Chat() {
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState(initialChannels[0]);
  const [channelMessages, setChannelMessages] = useState(mockInitialMessages);
  const [inputText, setInputText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const chatEndRef = useRef(null);

  const currentMessages = channelMessages[activeChannel.id] || [];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, activeChannel]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderName = isAnonymous
      ? "Anonymous Robin"
      : user?.user_metadata?.full_name || user?.email?.split("@")[0] || "You";

    const newMsg = {
      id: "msg_" + Date.now(),
      sender: senderName,
      avatar: isAnonymous ? null : null,
      role: "Member",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: { "❤️": 1 },
      isMine: true,
    };

    setChannelMessages((prev) => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), newMsg],
    }));

    setInputText("");
    toast.success("Message posted safely!");
  };

  const handleAddReaction = (msgId, emoji) => {
    setChannelMessages((prev) => {
      const channelMsgs = prev[activeChannel.id] || [];
      const updated = channelMsgs.map((m) => {
        if (m.id === msgId) {
          const currentCount = m.reactions[emoji] || 0;
          return {
            ...m,
            reactions: { ...m.reactions, [emoji]: currentCount + 1 },
          };
        }
        return m;
      });
      return { ...prev, [activeChannel.id]: updated };
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Channels List */}
          <div className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col shrink-0 hidden md:flex">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Community Channels
              </h3>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {initialChannels.map((chan) => (
                <button
                  key={chan.id}
                  onClick={() => setActiveChannel(chan)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium text-xs transition ${
                    activeChannel.id === chan.id
                      ? "bg-teal-600 text-white font-bold shadow-md"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-sm">{chan.icon}</span>
                  <span className="truncate">#{chan.name}</span>
                </button>
              ))}
            </nav>

            {/* Privacy Mode Box */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FiLock size={13} className="text-teal-400" /> Anonymous Handle
                </span>
                <button
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`w-10 h-5 rounded-full transition p-0.5 ${
                    isAnonymous ? "bg-teal-500" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition transform ${
                      isAnonymous ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Posting as: <strong className="text-teal-300">{isAnonymous ? "Anonymous Robin" : "Real Identity"}</strong>
              </p>
            </div>
          </div>

          {/* Main Chat Workspace */}
          <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
            {/* Channel Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeChannel.icon}</span>
                <div>
                  <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                    #{activeChannel.name}
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Encrypted Safe Space
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-1">{activeChannel.topic}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="hidden sm:flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full font-semibold">
                  <FiUsers size={14} className="text-teal-600" /> 4 Active Listeners
                </span>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {currentMessages.length === 0 ? (
                <div className="text-center py-20 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto text-xl font-bold">
                    💬
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No messages in #{activeChannel.name} yet</h3>
                  <p className="text-xs text-slate-500">Be the first to share an encouraging thought or check in!</p>
                </div>
              ) : (
                currentMessages.map((msg) => {
                  return (
                    <div key={msg.id} className="flex items-start gap-3.5 group">
                      {msg.avatar ? (
                        <img src={msg.avatar} alt={msg.sender} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                          {msg.sender.charAt(0)}
                        </div>
                      )}

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800">{msg.sender}</span>
                          {msg.isPeerListener && (
                            <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                              {msg.role}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400">{msg.time}</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200/80 shadow-xs max-w-2xl text-xs text-slate-800 leading-relaxed font-normal">
                          {msg.text}
                        </div>

                        {/* Message Reaction Emojis */}
                        <div className="flex items-center gap-1.5 pt-1">
                          {Object.entries(msg.reactions || {}).map(([emoji, count]) => (
                            <button
                              key={emoji}
                              onClick={() => handleAddReaction(msg.id, emoji)}
                              className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-[11px] font-semibold text-slate-600 transition flex items-center gap-1"
                            >
                              <span>{emoji}</span>
                              <span>{count}</span>
                            </button>
                          ))}
                          <button
                            onClick={() => handleAddReaction(msg.id, "❤️")}
                            className="p-1 text-slate-400 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
                            title="Add Heart"
                          >
                            <FiHeart size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message #${activeChannel.name} ${isAnonymous ? "(as Anonymous Robin)" : ""}...`}
                className="flex-1 py-3 px-4 bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center gap-2 shrink-0"
              >
                <FiSend size={15} /> Send
              </button>
            </form>
          </div>

          {/* Right Sidebar: Active Members */}
          <div className="w-60 bg-white border-l border-slate-200 p-4 hidden lg:block shrink-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Online Listeners ({channelOnlineUsers.length})
            </h4>

            <div className="space-y-3">
              {channelOnlineUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-2.5">
                  <div className="relative">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-xl object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{u.name}</p>
                    <p className="text-[10px] text-teal-600 font-medium">{u.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}