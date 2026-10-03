import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { FiUser } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
              <FiUser className="text-teal-600" /> My Wellness Profile
            </h1>
            <p className="text-xs text-slate-500">Manage your credentials, streak badges, and preferences</p>
          </div>

          <ProfileCard />
        </main>
      </div>
    </div>
  );
}