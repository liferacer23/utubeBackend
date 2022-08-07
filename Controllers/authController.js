import mongoose from "mongoose";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import { newUserValidator,userLoginValidator } from "../validation.js";

export const signUp = async (req, res, next) => {
  const validUser = newUserValidator({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  if (validUser.error) {
    res.status(500).json(validUser.error.details[0].message);
  } else {
    try {
      const localUserName = await User.findOne({ name: req.body.name });
      const localUserEmail = await User.findOne({ email: req.body.email });
      if (localUserName || localUserEmail) {
        res.status(500).json("User by that name or email already exists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          password: hashedPassword,
        });
        const registerUser = await newUser.save();
        const { password, ...others } = registerUser._doc;
        res.status(200).send("User has been registered");
      }
    } catch (err) {
      next(err);
    }
  }
};

export const signIn = async (req, res, next) => {
  const validUser = userLoginValidator({
    email: req.body.email,
    password: req.body.password,
  });
  if (validUser.error) {
    res.status(500).json(validUser.error.details[0].message);
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json("User does not exist");
      } else {
        const passwordCheck = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!passwordCheck) {
          res.status(500).json("Invalid password");
        } else {
          const { password, ...others } = user._doc;
          res.json(others);
        }
      }
    } catch (err) {
      next(err);
    }
  }
};
