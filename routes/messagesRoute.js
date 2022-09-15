import messageController from "../controllers/messagesController.js";

import express from 'express';
const router = express.Router();

router.post("/addmsg/", messageController.addMessage);
router.post("/getmsg/", messageController.getAllMessage);



export default router;
