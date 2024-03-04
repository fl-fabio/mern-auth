import {Router} from 'express';

import { Signup, Login, Logout} from '../controllers/auth.controller';
import { userVerification } from '../middlewares/auth.middleware';

export const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/", userVerification);
