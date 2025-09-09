import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { medicModel } from "../schemas/authschema";

const router = express.Router();

// Signup (doctor or chemist)
router.post("/signup", async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!["doctor", "chemist"].includes(role)) {
      return res.status(400).json({ error: "Role must be doctor or chemist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await medicModel.create({
      name,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    res.status(400).json({ error: "unable to signup" });
  }
});

// Login (doctor or chemist)
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await medicModel.findOne({ name });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
