const conn = require('../server/dbConnection').promise();

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter

    try {
        const [result] = await conn.execute(
            "DELETE FROM `users` WHERE `userId` = ?",
            [userId]
        );

        if (result.affectedRows > 0) {
            return res.json({
                status: true,
                message: "User deleted successfully"
            });
        }

        res.json({
            status: false,
            message: "User not found or already deleted"
        });
    } catch (err) {
        next(err);
    }
};