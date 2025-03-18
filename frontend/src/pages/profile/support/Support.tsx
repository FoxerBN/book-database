// Support.tsx
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import ChatHeader from "./ChatHeader";
import ChatStatus from "./ChatStatus";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const socket: Socket = io("http://localhost:3001");

export interface Message {
  message: string;
  isCreator: boolean;
}

const Support: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [isRoomReady, setIsRoomReady] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const existingRoom = params.get("roomId");

    if (existingRoom) {
      setRoomId(existingRoom);
      socket.emit("joinRoom", existingRoom);
    }

    socket.on("recieveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("roomReady", () => setIsRoomReady(true));
    socket.on("roomNotReady", () => setIsRoomReady(false));
    socket.on("roomCreated", (newRoomId: string) => {
      setRoomId(newRoomId);
      setIsRoomReady(false);
    });

    return () => {
      socket.off("recieveMessage");
      socket.off("roomReady");
      socket.off("roomNotReady");
      socket.off("roomCreated");
    };
  }, []);

  const createRoom = () => {
    setIsCreator(true);
    socket.emit("createRoom");
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", { roomId, message, isCreator });
    setMessage("");
  };

  return (
    <div className="w-full h-1/2 bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col">
      <ChatHeader onCreateRoom={createRoom} roomId={roomId} />
      
      {/* Messages area expands and scrolls */}
      <div className="flex-1 overflow-y-auto">
        {!isRoomReady ? (
          <ChatStatus isCreator={isCreator} />
        ) : (
          <ChatMessages messages={messages} isCreator={isCreator} />
        )}
      </div>
      
      {/* Chat input is always at the bottom */}
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isRoomReady={isRoomReady}
      />
    </div>
  );
};

export default Support;
