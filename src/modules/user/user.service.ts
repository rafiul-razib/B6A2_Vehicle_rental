import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [userId]);
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
  return result;
};

const updateUser = async (
  name: string,
  email: string,
  role: string,
  phone: string,
  userId: string,
) => {
  role = role.toLowerCase();

  const allowedRoles = ["admin", "customer"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }
  const result = await pool.query(
    `UPDATE users SET name=$1, role=$2, email=$3, phone=$4 WHERE id=$5 RETURNING *`,
    [name, role, email, phone, userId],
  );
  return result;
};
export const userServices = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
