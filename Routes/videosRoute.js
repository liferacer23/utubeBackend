import express from "express";
import { getVideos } from "../Controllers/videoController.js";

const router = express.Router();


router.get('/', getVideos)

export default router;
