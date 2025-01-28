const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    // Remove sensitive data
    const { password: _, ...userDetails } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user: userDetails
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Comprehensive Logout Route
router.post("/logout", (req, res) => {
  // Check if session exists
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ 
          message: "Could not log out", 
          error: err.message 
        });
      }
      
      // Clear session cookie
      res.clearCookie('connect.sid');
      
      res.status(200).json({ 
        message: "Logout successful",
        redirectTo: '/admin'
      });
    });
  } else {
    res.status(200).json({ 
      message: "No active session",
      redirectTo: '/admin'
    });
  }
});

module.exports = router;