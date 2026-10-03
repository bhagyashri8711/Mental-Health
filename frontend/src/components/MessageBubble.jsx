import { useAuth } from "../context/AuthContext";

export default function MessageBubble({ msg }) {
  const { user } = useAuth();

  const mine = msg.sender_id === user.id;

  return (
    <div
      className={`flex ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-sm p-3 rounded-xl ${
          mine
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        <p>{msg.message}</p>

        <small>
          {new Date(
            msg.created_at
          ).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
}