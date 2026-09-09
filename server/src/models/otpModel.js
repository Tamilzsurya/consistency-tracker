const {db} = require("../config/db");

const createOtp = async (userId, otpHash, expiresAt) => {
    const query = `
        INSERT INTO email_verification_otps
        (user_id, otp_hash, expires_at)
        VALUES (?, ?, ?)
        
        ON DUPLICATE KEY UPDATE
        otp_hash = VALUES(otp_hash),
        expires_at = VALUES(expires_at)
        `;
    
    const [result] = await db.execute(query, [userId, otpHash, expiresAt]);

    return result.insertId
}

// get otp by user id
const getOtp = async (userId) => {
    const query = `
        SELECT *
        FROM email_verification_otps
        WHERE user_id = ?
    `;

    const [rows] = await db.execute(query, [userId]);

    return rows[0];
}

// delete otp by user id
const deleteOtp = async (userId) => {
    const query = `
        DELETE FROM email_verification_otps
        WHERE user_id = ?
    `;

    const [result] = await db.execute(query, [userId]);

    return result;
}

module.exports = {
    createOtp,
    getOtp,
    deleteOtp
}