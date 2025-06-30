const Userlist = require("../Model/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create User
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userObj = new Userlist({
      email,
      password: hash,
    });

    await userObj.save();

    res.status(201).json({
      message: "User created successfully",
      user: userObj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the user.",
      error: error.message,
    });
  }
};

// Get Users
const getUser = async (req, res) => {
  try {
    const users = await Userlist.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching users.",
      error: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await Userlist.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required." });
    }

    const user = await Userlist.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "No account found with this email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ userId: user._id }, "123", {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
};
