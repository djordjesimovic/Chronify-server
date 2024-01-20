const conn = require('../dbConnection').promise();

exports.editTask = async (req, res, next) => {
    const taskId = req.params.taskId; // Assuming taskId is passed as a route parameter
    //const { updatedTaskData } = req.body; // Assuming updatedTaskData is sent in the request body
    const {task, taskInfo, taskDeadline, taskImportance, userId} = req.body;

    try {
        const [result] = await conn.execute(
            "UPDATE `tasks` SET `task`=?, `taskInfo`=?, `taskDeadline`=?, `taskImportance`=?, `userId`=? WHERE `taskId` = ?",
            [task, taskInfo, taskDeadline, taskImportance, userId, taskId]
        );

        if (result.affectedRows > 0) {
            return res.json({
                status: true,
                message: "Task updated successfully"
            });
        }

        res.json({
            status: false,
            message: "Task not found or not updated"
        });
    } catch (err) {
        next(err);
    }
};