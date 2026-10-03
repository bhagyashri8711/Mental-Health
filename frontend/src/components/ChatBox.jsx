import MessageBubble from "./MessageBubble";

export default function ChatBox({
  messages,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-[500px] overflow-y-auto">

      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          msg={msg}
        />
      ))}

    </div>
  );
}