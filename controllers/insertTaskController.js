const conn = require('../server/dbConnection').promise();

exports.insertTask = async (req, res, next) => {
    const { userId, task, taskInfo, taskDeadline, taskImportance, taskCompleted, taskInProgress, taskDate, taskApproved } = req.body;

    try {
        const [result] = await conn.execute(
            "INSERT INTO `tasks` (`userId`, `task`, `taskInfo`, `taskDeadline`, `taskImportance`, `taskCompleted`, `taskInProgress`, `taskDate`, `taskApproved`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [userId, task, taskInfo, taskDeadline, taskImportance, taskCompleted, taskInProgress, taskDate, taskApproved]
        );

        if (result.affectedRows > 0) {
            return res.json({
                status: true,
                message: "Task inserted successfully"
            });
        }

        res.json({
            status: false,
            message: "Failed to insert task"
        });
    } catch (err) {
        next(err);
    }
};
