import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.signin(email, password);
    res.status(201).json({
      success: true,
      message: "Logged in successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const signup = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await authServices.signup(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  signin,
  signup,
};
