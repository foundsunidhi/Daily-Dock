import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import { sendEmail } from "../utils/sendEmail";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Generate a random password
const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Register function
export const register = async (req: Request, res: Response) => {
  const { name, email, empCode, role } = req.body;

  try {
    if (!/^viskk\d{4}$/.test(empCode)) {
      return res.status(400).json({ message: "empCode must be in the format viskkXXXX" });
    }

    const empExists = await User.findOne({ empCode });
    if (empExists) {
      return res.status(400).json({ message: "empCode already taken" });
    }

    const tempPassword = generateRandomPassword();

const hashedPassword = await bcrypt.hash(tempPassword, 10);

const user = await User.create({
  name,
  email,
  empCode,
  role,
  password: hashedPassword,
});

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2>Welcome, ${name}!</h2>
        <p>We're excited to have you on board.</p>
        <p><strong>Your login credentials:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${tempPassword}</li>
        </ul>
        <p>Please log in and change your password at your earliest convenience.</p>
        <br/>
        <p>Regards,<br/>Team Viskk</p>
      </div>
    `;

    await sendEmail({ to: email, subject: "Your Login Credentials - Viskk", html });


    res.status(201).json({
      message: "User registered successfully. Please check your email for the password."
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};


// Login function
export const login = async (req: Request, res: Response) => {
  const { empCode, password } = req.body;

  try {
    const user = await User.findOne({ empCode });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "30d" });

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});

res.json({
  message: "Login successful",
  profile: {
    id: user._id,
    name: user.name,
    empCode: user.empCode,
    role: user.role,
    email: user.email,
  },
});

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Update empCode function
export const updateEmpCode = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { empCode } = req.body;

  try {
    if (!/^viskk\d{4}$/.test(empCode)) {
      return res.status(400).json({ message: "empCode must be in the format viskkXXXX" });
    }

    const empExists = await User.findOne({ empCode });
    if (empExists) {
      return res.status(400).json({ message: "empCode already taken" });
    }

    const user = await User.findByIdAndUpdate(id, { empCode }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "empCode updated successfully", user });
  } catch (error) {
    console.error("Update empCode error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Change Password
export const changePassword = async (req: Request, res: Response) => {
  const { empCode } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ empCode });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get Profile
export const getUserProfile = async (req: Request, res: Response) => {
  const { empCode } = req.params;

  try {
    const user = await User.findOne({ empCode })
      .populate("role")  
      .select("-password"); 

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Logout function
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax", 
      secure: process.env.NODE_ENV === "production", 
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during logout", error });
  }
};
