import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(201).json({
      success: true,
      message: "Data fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "User not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  getAllUsers,
  getSingleUser,
};
