import { sendRoomCreationEmail } from "../utils/emailService.js";
import { generateRoomId } from "../utils/createId.js";
import   userCleanup   from '../utils/userCleanup.js'

const rooms = {};

export function registerSocketListeners(io) {
  io.on("connection", (socket) => {
    console.log(`🔌 New user connected: ${socket.id}`);

    socket.on("createRoom", async () => {
      const roomId = generateRoomId();
      rooms[roomId] = [socket.id];

      socket.join(roomId);

      try {
        await sendRoomCreationEmail("barspin4499@gmail.com", roomId);
        socket.emit("roomCreated", roomId);
        console.log(`✅ Room created: ${roomId}`);
      } catch {
        socket.emit("error", "Failed to send email.");
      }
    });

    socket.on("joinRoom", (roomId) => {
      if (!rooms[roomId]) rooms[roomId] = [];

      const currentRoom = rooms[roomId];

      if (currentRoom.length >= 2) {
        socket.emit("error", "Room is full.");
        return;
      }

      currentRoom.push(socket.id);
      socket.join(roomId);
      console.log(`🚪 ${socket.id} joined room ${roomId}`);

      if (currentRoom.length === 2) {
        io.to(roomId).emit("roomReady");
      }
    });

    socket.on("message", ({ roomId, message, isCreator }) => {
      io.to(roomId).emit("recieveMessage", { message, isCreator });
      console.log(`💬 Message to room ${roomId}: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 User disconnected: ${socket.id}`);

      Object.entries(rooms).forEach(([roomId, users]) => {
        const userIndex = users.indexOf(socket.id);
        if (userIndex > -1) {
            userCleanup(io, rooms, roomId, socket.id);
        }
      });
    });
  });
}
