import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ Routes where to grab information*/
router.get("/:id", verifyToken, getUser); //grab data from the database with that id
router.get("/:id/friends", verifyToken, getUserFriends); //grab the user friends

/* UPDATE */ //in update function i will use the patch
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
