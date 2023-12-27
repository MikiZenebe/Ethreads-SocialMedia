import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../helpers/genToken_setToken.js";

export const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    //Check if the user in the databse
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      genToken(newUser._id, res);
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ "Error in signupUser": error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatched = await bcrypt.compare(password, user.password);

    if (!user || !isMatched)
      return res.status(400).json({ message: "Invalid username or password" });

    genToken(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ "Error in loginUser": error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in logoutUser: ", error.message);
  }
};

export const followUser_unFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id)
      return res
        .status(400)
        .json({ message: "You can't follow/unfollow yourself" });

    if (!userToFollow || !currentUser)
      return res.status(400).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });
      res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      //Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      res.status(200).json({ message: "Followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(message, error.message);
  }
};

export const updateUser = async (req, res) => {
  const { name, email, username, password, profilePic, bio } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ message: "You can't update other's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    //Update the user
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in updateUser: ", error.message);
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");

    if (!user) return res.status(400).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getUserProfile: ", error.message);
  }
};
