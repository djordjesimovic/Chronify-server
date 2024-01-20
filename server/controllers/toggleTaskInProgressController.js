const conn = require('../dbConnection').promise();

exports.toggleTaskInProgress = async (req, res, next) => {
    const taskId = req.params.taskId; // Assuming taskId is passed as a route parameter

    try {
        // Fetch the current value of taskInProgress from the database
        const [currentResult] = await conn.execute(
            "SELECT `taskInProgress` FROM `tasks` WHERE `taskId` = ?",
            [taskId]
        );

        if (currentResult.length === 0) {
            return res.json({
                status: false,
                message: "Task not found",
            });
        }

        const currentInProgress = currentResult[0].taskInProgress;

        // Toggle the value (true to false, false to true)
        const updatedInProgress = !currentInProgress;

        // Update the taskInProgress field in the database
        const [updateResult] = await conn.execute(
            "UPDATE `tasks` SET `taskInProgress` = ? WHERE `taskId` = ?",
            [updatedInProgress, taskId]
        );

        if (updateResult.affectedRows > 0) {
            return res.json({
                status: true,
                message: `Task progress updated successfully. New value: ${updatedInProgress}`,
            });
        }

        res.json({
            status: false,
            message: "Task not found or not updated",
        });
    } catch (err) {
        next(err);
    }
};
