const conn = require('../server/dbConnection').promise();

exports.completeTask = async (req, res, next) => {
    const taskId = req.params.taskId; // Assuming taskId is passed as a route parameter

    try {
        const [result] = await conn.execute(
            "UPDATE `tasks` SET `taskCompleted` = true WHERE `taskId` = ? AND `taskCompleted` = false",
            [taskId]
        );

        if (result.affectedRows > 0) {
            return res.json({
                status: true,
                message: "Task completed successfully"
            });
        }

        res.json({
            status: false,
            message: "Task not found or already completed"
        });
    } catch (err) {
        next(err);
    }
};
