import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function SupportRequests() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            🤝 Support Requests
          </h1>

          <div className="bg-white rounded-xl shadow mt-6 p-6">
            Support requests will appear here.
          </div>

        </div>

      </div>

    </div>
  );
}