import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getMoodReports } from "../../services/moodReportService";

export default function MoodReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    const data = await getMoodReports();
    setReports(data);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6">
            😊 Mood Reports
          </h1>

          <div className="bg-white rounded-xl shadow p-6">
            <table className="w-full">

              <thead className="bg-indigo-600 text-white">

                <tr>
                  <th className="p-4">Mood</th>
                  <th className="p-4">Note</th>
                  <th className="p-4">Date</th>
                </tr>

              </thead>

              <tbody>

                {reports.map((report) => (

                  <tr key={report.id} className="border-b">

                    <td className="p-4 text-2xl">
                      {report.mood}
                    </td>

                    <td className="p-4">
                      {report.note || "-"}
                    </td>

                    <td className="p-4">
                      {new Date(report.created_at).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}