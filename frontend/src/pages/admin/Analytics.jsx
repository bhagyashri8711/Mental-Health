import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            📊 Analytics
          </h1>

          <div className="bg-white rounded-xl shadow mt-6 p-6">
            Analytics charts will appear here.
          </div>

        </div>

      </div>

    </div>
  );
}