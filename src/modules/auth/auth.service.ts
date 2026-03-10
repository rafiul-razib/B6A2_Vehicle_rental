import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

type TUser = {
  name: string;
  role: "admin" | "customer";
  email: string;
  password: string;
  phone: string;
};

const signin = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  console.log("result", result);
  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  // console.log({ match, user });

  if (!match) {
    return false;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret as string,
    { expiresIn: "7d" },
  );

  console.log({ token });

  return { token, user };
};

const signup = async (payload: TUser) => {
  const { name, role, email, password, phone } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, role, email, password, phone) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, role, email, hashedPass, phone],
  );

  return result;
};

export const authServices = {
  signin,
  signup,
};
