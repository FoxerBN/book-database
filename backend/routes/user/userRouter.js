import express from 'express';
const userRouter = express.Router();
import {validateUser} from '../../middlewares/validateUser.js'
import { registerUser } from '../../controllers/user/registerUser.js';
import { loginUser } from '../../controllers/user/loginUser.js';
import { verifyAccessToken } from '../../middlewares/auth/verifyToken.js'
userRouter.post('/register', validateUser, registerUser)
userRouter.post('/login', loginUser)
userRouter.get("/protected", verifyAccessToken, (req, res) => {
    res.status(200).json({ message: "User is authenticated", user: req.user });
  });
export default userRouter;