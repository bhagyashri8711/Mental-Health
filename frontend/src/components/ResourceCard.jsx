export default function ResourceCard({ resource }) {

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition">

      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        {resource.type}
      </span>

      <h2 className="text-xl font-bold mt-3">
        {resource.title}
      </h2>

      <a
        href={resource.link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 font-semibold mt-4 inline-block"
      >
        Open Resource →
      </a>

      <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600">
        ❤️ Save
      </button>

    </div>
  );

}