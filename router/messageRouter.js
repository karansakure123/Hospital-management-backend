import express from "express"
import { sendMessage } from "../controller/messageController.js"
const router = express.Router();
import {getAllMessages} from "../controller/messageController.js"
 router.post("/send", sendMessage)
router.get("/getall", getAllMessages)

export default router;