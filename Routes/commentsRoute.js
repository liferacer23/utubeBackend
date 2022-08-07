import express from "express";
import { getComments } from "../Controllers/commentController.js";

const router = express.Router();

router.get("/", getComments);

export default router;
