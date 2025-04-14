import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Registration function
export const register = async (req: Request, res: Response) => {
  const { name, email, empCode, role, password } = req.body;

  // Validate empCode format
  if (!/^viskk\d{4}$/.test(empCode)) {
    return res.status(400).json({ message: "empCode must be in the format viskkXXXX" });
  }

  // Check if empCode exists
  const empExists = await User.findOne({ empCode });
  if (empExists) {
    return res.status(400).json({ message: "empCode already taken" });
  }

  // Check if email exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user in the database
  const user = await User.create({ name, email, empCode, role, password: hashedPassword });

  // Return success message
  res.status(201).json({ message: "User registered successfully" });
};

// Login function
export const login = async (req: Request, res: Response) => {
  const { empCode, password } = req.body;

  // Find user by empCode
  const user = await User.findOne({ empCode });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare entered password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

  // Send response with token and user profile
  res.json({
    message: "Login successful",
    token,
    profile: {
      id: user._id,
      name: user.name,
      empCode: user.empCode,
      role: user.role,
      email: user.email,
    },
  });
};
