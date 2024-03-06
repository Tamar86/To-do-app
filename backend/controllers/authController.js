const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

const authController = {};
//controller function for user registration
authController.register = async (req, res) => {
  try {
    //extract user data from request body
    const { password, email } = req.body;
    //check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    //create a new user document
    const newUser = new User({
      password,
      email,
    });
    //save the new user document in database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
//Controller function for user  login
authController.login = async (req, res) => {
  try {
    const { email } = req.body;
    //find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    //generate and send the jwt token upon successful login
    const token = jwt.sign({userId: user._id, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User logged in successfully", token: token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = authController;


