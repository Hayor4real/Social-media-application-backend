import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // signify that this route will all be configured

router.post("/login", login);

export default router;
