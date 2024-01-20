const conn = require('../server/dbConnection').promise();

exports.deleteTask = async (req, res, next) => {
    const taskId = req.params.taskId; // Assuming taskId is passed as a route parameter

    try {
        const [result] = await conn.execute(
            "DELETE FROM `tasks` WHERE `taskId` = ?",
            [taskId]
        );

        if (result.affectedRows > 0) {
            return res.json({
                status: true,
                message: "Task deleted successfully"
            });
        }

        res.json({
            status: false,
            message: "Task not found or already deleted"
        });
    } catch (err) {
        next(err);
    }
};