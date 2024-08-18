import express from "express"
import { sendMessage } from "../controller/messageController.js"
const router = express.Router();
import {getAllMessages} from "../controller/messageController.js"
import {isAdminAuthenticate} from "../middlewares/auth.js"
router.post("/send", sendMessage)
router.get("/getall",isAdminAuthenticate, getAllMessages)

export default router;