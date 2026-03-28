import { Router } from "express";
import { MessageController } from "../controller/message.controller";

const router = Router();
const messageController = new MessageController();

router.post("/messages", (req, res) => messageController.createMessage(req, res));
router.get("/messages", (req, res) => messageController.listMessages(req, res));
router.get("/messages/:id", (req, res) => messageController.getMessageById(req, res));

export default router;