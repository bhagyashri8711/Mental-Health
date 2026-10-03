import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  getResources,
  addResource,
  updateResource,
  deleteResource,
} from "../../services/resourceService";
export default function ResourcesManager() {
  const [resources, setResources] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Article");
  const [link, setLink] = useState("");

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    const data = await getResources();
    setResources(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const resource = {
      title,
      description,
      category,
      link,
    };

    if (editingId) {
      await updateResource(editingId, resource);
    } else {
      await addResource(resource);
    }

    setTitle("");
    setDescription("");
    setCategory("Article");
    setLink("");
    setEditingId(null);

    loadResources();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this resource?")) return;

    await deleteResource(id);
    loadResources();
  }

  function handleEdit(resource) {
    setEditingId(resource.id);
    setTitle(resource.title);
    setDescription(resource.description);
    setCategory(resource.category);
    setLink(resource.link);
  }

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase()) ||
    resource.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-6">
            📚 Resources Manager
          </h1>

          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
              <h2 className="text-lg">Total Resources</h2>
              <p className="text-3xl font-bold mt-2">
                {resources.length}
              </p>
            </div>

            <div className="bg-green-600 text-white rounded-xl p-6 shadow">
              <h2 className="text-lg">Articles</h2>
              <p className="text-3xl font-bold mt-2">
                {
                  resources.filter(
                    (r) => r.category === "Article"
                  ).length
                }
              </p>
            </div>

            <div className="bg-purple-600 text-white rounded-xl p-6 shadow">
              <h2 className="text-lg">Videos</h2>
              <p className="text-3xl font-bold mt-2">
                {
                  resources.filter(
                    (r) => r.category === "Video"
                  ).length
                }
              </p>
            </div>

          </div>

          {/* Search */}

          <input
            type="text"
            placeholder="🔍 Search resources..."
            className="border rounded-lg p-3 w-full md:w-96 mb-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Add / Edit Form */}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 mb-8"
          >

            <div className="grid md:grid-cols-2 gap-4">

              <input
                className="border p-3 rounded"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <select
                className="border p-3 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Article</option>
                <option>Video</option>
                <option>Podcast</option>
              </select>

              <textarea
                rows="3"
                className="border p-3 rounded md:col-span-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                className="border p-3 rounded md:col-span-2"
                placeholder="Resource Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

            </div>

            <button
              className={`mt-5 px-6 py-3 rounded-lg text-white ${
                editingId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {editingId ? "💾 Update Resource" : "➕ Add Resource"}
            </button>

          </form>

          {/* Resource Table */}
          {/* Resource Table */}

<div className="bg-white rounded-xl shadow overflow-x-auto">

  <table className="w-full">

    <thead className="bg-indigo-600 text-white">

      <tr>
        <th className="p-4 text-left">Title</th>
        <th className="p-4 text-left">Category</th>
        <th className="p-4 text-left">Description</th>
        <th className="p-4 text-left">Link</th>
        <th className="p-4 text-center">Actions</th>
      </tr>

    </thead>

    <tbody>

      {filteredResources.length > 0 ? (

        filteredResources.map((resource) => (

          <tr
            key={resource.id}
            className="border-b hover:bg-gray-50 transition"
          >

            <td className="p-4 font-medium">
              {resource.title}
            </td>

            <td className="p-4">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                {resource.category}
              </span>
            </td>

            <td className="p-4 max-w-sm">
              {resource.description}
            </td>

            <td className="p-4">

              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open Resource
              </a>

            </td>

            <td className="p-4">

              <div className="flex justify-center gap-3">

                <button
                  onClick={() => handleEdit(resource)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(resource.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  🗑 Delete
                </button>

              </div>

            </td>

          </tr>

        ))

      ) : (

        <tr>

          <td
            colSpan="5"
            className="text-center py-8 text-gray-500"
          >
            No resources found.
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