import { useState } from "react";
import { FiBell, FiMoon, FiShield, FiLock, FiPhoneCall, FiSave } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function SettingsCard() {
  const [notifications, setNotifications] = useState(true);
  const [peerAlerts, setPeerAlerts] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("Jane Doe (+1 555-0192)");

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Preferences updated successfully! ⚙️");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-8 shadow-xs space-y-6 max-w-3xl">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <FiShield className="text-teal-600" /> Platform Settings & Privacy
        </h2>
        <p className="text-xs text-slate-500">Configure your notifications, safety, and theme preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Toggle 1: Notifications */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <FiBell size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Daily Wellness Reminders</p>
              <p className="text-xs text-slate-500">Receive gentle push notifications for daily mood check-ins</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition p-1 ${
              notifications ? "bg-teal-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition transform ${
                notifications ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Peer Support Alerts */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <FiShield size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Peer Support Alerts</p>
              <p className="text-xs text-slate-500">Get notified when a peer responds to your support request</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPeerAlerts(!peerAlerts)}
            className={`w-12 h-6 rounded-full transition p-1 ${
              peerAlerts ? "bg-teal-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition transform ${
                peerAlerts ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Default Anonymous Mode */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FiLock size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Default Anonymous Mode</p>
              <p className="text-xs text-slate-500">Automatically hide your real name in community chat channels</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAnonymousMode(!anonymousMode)}
            className={`w-12 h-6 rounded-full transition p-1 ${
              anonymousMode ? "bg-teal-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition transform ${
                anonymousMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Emergency Trusted Contact
          </label>
          <div className="relative">
            <FiPhoneCall className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Name & Phone Number"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <FiSave size={16} /> Save Preference Changes
          </button>
        </div>
      </form>
    </div>
  );
}