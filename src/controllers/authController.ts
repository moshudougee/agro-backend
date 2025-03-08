import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(404).json({ error: "User not found" })
        return;
    };

    const { password: pass, ...rest } = user;

    const validPassword = await bcrypt.compare(password, pass);
    if (!validPassword) {
        res.status(401).json({ error: "Invalid credentials" })
        return;
    };
    /** 
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY);

    res.cookie("auth_token", token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        signed: true,
        maxAge: 24 * 60 * 60 * 1000 
    }) */
    res.json({ message: "Login successful", rest});
  } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed" });
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
    try {
        //console.log('Cookie', req.signedCookies);
        const token = req.signedCookies.auth_token; // Get token from signed cookie
        if (!token) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }
    
        const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
        const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true, email: true, role: true } });
    
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
    
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

  export const logout = async (req: Request, res: Response): Promise<void> => {
        try {
            res.clearCookie("auth_token");
            res.json({ message: "Logged out successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Logout failed" });
        }
  };
