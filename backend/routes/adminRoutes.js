const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Customer = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const KEY = "jwttokenkey"; // You may want to use environment variables for production

//register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;  // Extract role from request body
    const cus = await Customer.findOne({ email });
    
    if (cus) {
      return res.status(409).json({ 
        status: false,
        message: "User already exists" 
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    
    // Include role in the new customer object
    const newCustomer = new Customer({
      email,
      password: hashpassword,
      role    // Add this line to include the role
    });

    await newCustomer.save();
    
    return res.status(201).json({ 
      status: true,
      message: "User registered successfully",
      user: {
        email: newCustomer.email,
        role: newCustomer.role  // Return the role in response
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      status: false,
      message: "Internal server error" 
    });
  }
});

// Login User
// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Customer.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });  // Set the cookie
  return res.json({ token, user }); // Send token and user data
});


// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }

    const token = jwt.sign({ id: user._id }, KEY, { expiresIn: '5m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'piruthivikulasegaram@gmail.com',
        pass: 'RuthiKrish#24',
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    const mailOptions = {
      from: 'piruthivikulasegaram@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `${process.env.REACT_APP_FRONTEND_URL}/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });

  } catch (err) {
    console.log(err);
  }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, KEY);
    const id = decoded.id;

    const hashpassword = await bcrypt.hash(password, 10);
    await Customer.findByIdAndUpdate(id, { password: hashpassword });
    return res.json({ status: true, message: "password updated" });
  } catch (err) {
    return res.json("invalid token");
  }
});

// Verify User (for protected routes)
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Use cookies to check the JWT
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }

    const decoded = await jwt.verify(token, KEY);
    req.user = decoded; // Store user info in req.user
    next();
  } catch (err) {
    return res.json(err);
  }
};

// Verify Admin (for admin-specific routes)
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.json({ status: false, message: "Access denied" });
  }
  next();
};

// Example protected route
router.get("/index-two", verifyUser, verifyAdmin, (req, res) => {
  return res.json({ status: true, message: "Welcome to the Admin Dashboard!" });
});

// Logout User
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
        redirectTo: '/login'
      });
    });
  } else {
    res.status(200).json({ 
      message: "No active session",
      redirectTo: '/login'
    });
  }
});

module.exports = router;
