/**
 * Generates a simple random 6-character ID.
 * @returns {string} A randomized ID.
 */
export function generateRoomId() {
    return Math.random().toString(36).substring(2, 8);
  }
  