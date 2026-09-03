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

module.exports = {
    createOtp
}