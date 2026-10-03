import { useState } from "react";
import { FiBell, FiCheckCircle, FiHeart, FiMessageSquare, FiX } from "react-icons/fi";

const sampleNotifications = [
  {
    id: 1,
    title: "Support Request Accepted",
    desc: "Elena Rostova (Certified Listener) accepted your session request.",
    time: "5 mins ago",
    icon: FiCheckCircle,
    color: "text-emerald-500",
    unread: true,
  },
  {
    id: 2,
    title: "Virtual Hug Received",
    desc: "A community peer sent you a virtual hug on your post.",
    time: "20 mins ago",
    icon: FiHeart,
    color: "text-rose-500",
    unread: true,
  },
  {
    id: 3,
    title: "New Message in #general-support",
    desc: "Aisha Patel shared a mindfulness tip for evening calm.",
    time: "1 hour ago",
    icon: FiMessageSquare,
    color: "text-indigo-500",
    unread: false,
  },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none"
        aria-label="Notifications"
      >
        <FiBell size={21} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} className="fixed inset-0 z-40" />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-800">Notifications</h4>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-bold text-teal-600 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border text-xs space-y-1 transition ${
                      n.unread
                        ? "bg-teal-50/50 border-teal-200"
                        : "bg-slate-50/50 border-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Icon className={n.color} size={15} /> {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{n.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}