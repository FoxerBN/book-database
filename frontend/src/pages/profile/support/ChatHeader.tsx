import React from "react";
import { FaPlus } from "react-icons/fa";

interface ChatHeaderProps {
  onCreateRoom: () => void;
  roomId: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onCreateRoom, roomId }) => (
  <div className="px-4 py-3 border-b dark:border-zinc-700 flex justify-between items-center">
    <h2 className="text-lg font-semibold dark:text-white">Assistant</h2>
    {roomId ? (
      <span className="text-green-500 font-bold text-sm">Room: {roomId}</span>
    ) : (
      <button onClick={onCreateRoom}>
        <FaPlus className="text-blue-500 text-xl" />
      </button>
    )}
  </div>
);

export default ChatHeader;
