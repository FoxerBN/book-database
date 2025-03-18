import React from "react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  isRoomReady: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  sendMessage,
  isRoomReady,
}) => (
  <div className="px-3 py-2 border-t dark:border-zinc-700">
    <div className="flex gap-2">
      <input
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!isRoomReady}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 text-sm disabled:opacity-50"
        onClick={sendMessage}
        disabled={!isRoomReady}
      >
        Send
      </button>
    </div>
  </div>
);

export default ChatInput;
