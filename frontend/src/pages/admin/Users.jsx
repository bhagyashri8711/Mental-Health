import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getUsers } from "../../services/userService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  const filteredUsers = users.filter((user) => {
    const name = user.full_name || "";
    const email = user.email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-6">
            👥 Users Management
          </h1>

          {/* Search Box */}
          <div className="mb-6">

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          {/* Users Table */}

          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

            <table className="w-full">

              <thead className="bg-indigo-600 text-white">

                <tr>

                  <th className="p-4 text-left">Name</th>

                  <th className="p-4 text-left">Email</th>

                  <th className="p-4 text-left">Role</th>

                  <th className="p-4 text-left">Bio</th>

                  <th className="p-4 text-left">Joined</th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.length > 0 ? (

                  filteredUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 font-medium">
                        {user.full_name}
                      </td>

                      <td className="p-4">
                        {user.email}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            user.role === "admin"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>

                      <td className="p-4">
                        {user.bio || "-"}
                      </td>

                      <td className="p-4">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500"
                    >
                      No users found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}