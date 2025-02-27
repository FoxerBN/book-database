import express from "express";
import deleteUser from '../../controllers/user/deleteUser.js'
import { verifyAccessToken } from "../../middlewares/auth/verifyToken.js";
const removeUser = express.Router();

removeUser.delete('/remove',verifyAccessToken, deleteUser)

export default removeUser;