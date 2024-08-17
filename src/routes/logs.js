import { Router } from "express";
import {getVerificationLogs} from '../controllers/logs.controller';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();

router.get('/verification-logs',authRequired, getVerificationLogs);

export default router;