import express from "express";
import { signIn, signUp } from "../Controllers/authController.js";

const router = express.Router();

//CREATE USER

router.post('/signup', signUp)

//SIGN IN

router.post('/signin', signIn)

//GOOGLE AUTH

router.post('/google', )
export default router;
