import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  followUser_unFollowUser,
  updateUser,
  getUserProfile,
} from "../controllers/usersControllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUser_unFollowUser); //Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);

export default router;
