import express from 'express';
import { searchUsersByName } from '../../controllers/user/friends/searchUserByName.js'
import { verifyAccessToken } from '../../middlewares/auth/verifyToken.js';
import { addFriend } from '../../controllers/user/friends/addFriend.js';
import { getFriends } from '../../controllers/user/friends/getFriends.js';
import { removeFriend }   from '../../controllers/user/friends/removeFriend.js'
const friendsRouter = express.Router();

friendsRouter.get('/search', verifyAccessToken, searchUsersByName);
friendsRouter.post('/add',verifyAccessToken, addFriend)
friendsRouter.get('/all', verifyAccessToken, getFriends);
friendsRouter.delete("/remove/:friendId", verifyAccessToken, removeFriend);
export default friendsRouter

