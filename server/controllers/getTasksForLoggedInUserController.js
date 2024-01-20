const conn = require('../dbConnection').promise();

exports.getTasksForLoggedInUser = async (req, res, next) => {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter

    try {
        const [rows] = await conn.query(
            "SELECT * FROM `tasks` WHERE `userId` = ?",
            [userId]
        );

        if (rows.length > 0) {
            return res.json({
                status: true,
                tasks: rows
            });
        }

        res.json({
            status: false,
            message: "No tasks found for the user"
        });
    } catch (err) {
        next(err);
    }
};
