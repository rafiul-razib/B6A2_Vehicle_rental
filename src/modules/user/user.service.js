"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const db_1 = require("../../config/db");
const getAllUsers = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const getSingleUser = async (userId) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE id=$1`, [userId]);
    return result;
};
const deleteUser = async (userId) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
    return result;
};
const updateUser = async (name, email, role, phone, userId) => {
    if (role) {
        role = role.toLowerCase();
        const allowedRoles = ["admin", "customer"];
        if (!allowedRoles.includes(role)) {
            throw new Error("Invalid role");
        }
        const result = await db_1.pool.query(`UPDATE users SET name=$1, role=$2, email=$3, phone=$4 WHERE id=$5 RETURNING *`, [name, role, email, phone, userId]);
        return result;
    }
    else {
        const result = await db_1.pool.query(`UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING *`, [name, email, phone, userId]);
        return result;
    }
};
exports.userServices = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
