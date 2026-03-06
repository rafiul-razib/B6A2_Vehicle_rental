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
    const result = await userServices.getSingleUser(
      req.params.userId as string,
    );

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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.userId as string);

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "User not found!",
      });
    } else {
      res.status(500).json({
        success: true,
        message: "User deleted successfully!",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, role, email, phone } = req.body;
  try {
    const result = await userServices.updateUser(
      name,
      role,
      email,
      phone,
      req.params.userId as string,
    );

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
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
  deleteUser,
  updateUser,
};
