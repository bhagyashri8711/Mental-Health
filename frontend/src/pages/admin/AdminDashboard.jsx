import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getAdminStats } from "../../services/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    moods: 0,
    requests: 0,
    resources: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getAdminStats();
      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            🛡️ Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold">👥 Users</h2>
              <p className="text-4xl font-bold mt-4">{stats.users}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold">😊 Mood Logs</h2>
              <p className="text-4xl font-bold mt-4">{stats.moods}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold">🤝 Support Requests</h2>
              <p className="text-4xl font-bold mt-4">{stats.requests}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold">📚 Resources</h2>
              <p className="text-4xl font-bold mt-4">{stats.resources}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}