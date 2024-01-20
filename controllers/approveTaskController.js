const conn = require('../server/dbConnection').promise();

exports.approveTask = async (req, res, next) => {
    const taskId = req.params.taskId; // Assuming taskId is passed as a route parameter

    try {
        const [result] = await conn.execute(
            "UPDATE `tasks` SET `taskApproved` = true WHERE `taskId` = ? AND `taskApproved` = false",
            [taskId]
        );

        if (result.affectedRows > 0) {
            return res.json({
                status: true,
                message: "Task approved successfully"
            });
        }

        res.json({
            status: false,
            message: "Task not found or already approved"
        });
    } catch (err) {
        next(err);
    }
};
