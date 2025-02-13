import express from 'express';
const userRouter = express.Router();
import {validateUser} from '../../middlewares/validateUser.js'
import { registerUser } from '../../controllers/user/registerUser.js';


userRouter.post('/register', validateUser, registerUser)

export default userRouter;