import { Router } from "express";
import { VerifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  VerifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", VerifyToken, sendChatsToUser);
chatRoutes.delete("/delete", VerifyToken, deleteChats);

export default chatRoutes;