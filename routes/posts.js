import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); // grab the user feed when we run the homepage
router.get("/:userId/posts", verifyToken, getUserPosts); //grab only the relevant post

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); // for liking the post and unliking

export default router;
