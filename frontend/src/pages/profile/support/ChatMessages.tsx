import React from "react";
import { Message } from "./Support";

interface ChatMessagesProps {
  messages: Message[];
  isCreator: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isCreator }) => (
  <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`max-w-[70%] rounded-lg px-3 py-1.5 text-sm break-words whitespace-normal ${
        msg.isCreator === isCreator
          ? "self-end bg-blue-500 text-white"
          : "self-start bg-green-500 text-white"
      }`}
    >
      {msg.message}
    </div>
  ))}
</div>
);

export default ChatMessages;
