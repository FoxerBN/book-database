// Add this function to your listeners.js file
export default function usersCleanup(io, rooms, roomId, socketId) {
    const users = rooms[roomId];
    if (users) {
      // Remove the disconnected user's socket id
      const index = users.indexOf(socketId);
      if (index > -1) {
        users.splice(index, 1);
      }
      // If no users remain in the room, delete it
      if (users.length === 0) {
        delete rooms[roomId];
        console.log(`🗑️ Room ${roomId} deleted`);
      } else {
        // Notify remaining user(s) that the room is no longer ready
        io.to(roomId).emit("roomNotReady");
        console.log(`🔔 Room ${roomId} is not ready`);
      }
    }
  }
  