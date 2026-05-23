import { useState } from "react";

interface SnackbarMessage {
  id: number;
  text: string;
  color: "red" | "green" | "yellow" | "blue"; // add color field
}

// Custom Hook to manage Snackbar state
export const useSnackbar = () => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const addMessage = (
    text: string,
    color: "red" | "green" | "yellow" | "blue",
  ) => {
    const id = Date.now() + Math.random(); // Unique ID
    setMessages((prev) => [...prev, { id, text, color }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  };

  return { messages, addMessage };
};

// The UI Component
export default function Snackbar({
  messages,
}: {
  messages: SnackbarMessage[];
}) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="text-white px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base pointer-events-auto animate-bounce"
          style={{ backgroundColor: msg.color }} // dynamic background
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
