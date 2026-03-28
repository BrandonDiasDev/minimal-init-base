import { Router } from "express";
import { MessageController } from "../controller/message.controller";

const router = Router();
const messageController = new MessageController();

router.post("/messages", async (req, res, next) => {
  try {
    await messageController.createMessage(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/messages", async (req, res, next) => {
  try {
    await messageController.listMessages(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/messages/:id", async (req, res, next) => {
  try {
    await messageController.getMessageById(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;