import { useState } from "react";

export default function ChatInput({ send }) {
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    send(text);

    setText("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex gap-3 mt-4"
    >
      <input
        className="flex-1 border rounded-lg p-3"
        placeholder="Type message..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button
        className="bg-blue-600 text-white px-6 rounded-lg"
      >
        Send
      </button>
    </form>
  );
}