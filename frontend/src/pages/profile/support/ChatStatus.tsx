import React from "react";
import { PulseLoader } from "react-spinners";

interface ChatStatusProps {
  isCreator: boolean;
}

const ChatStatus: React.FC<ChatStatusProps> = ({ isCreator }) => (
  <div className="flex flex-1 items-center justify-center">
    {isCreator ? (
      <PulseLoader color="#3fa4b4" size="medium" />
    ) : (
      <div className="text-gray-500">Connecting to the room...</div>
    )}
  </div>
);

export default ChatStatus;
