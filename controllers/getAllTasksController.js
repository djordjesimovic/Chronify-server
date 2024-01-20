
const conn = require('../server/dbConnection').promise();

exports.getAllTasks = async (req, res, next) => {
    try {
        const [tasks] = await conn.execute(
            "SELECT * FROM `tasks`"
        );

        if (tasks.length > 0) {
            res.json({
                status: true,
                message: "Tasks found",
                tasks: tasks
            });
        } else {
            res.json({
                status: false,
                message: "No tasks found",
                tasks: []
            });
        }
    } catch (err) {
        next(err);
    }
};