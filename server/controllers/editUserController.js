const conn = require('../dbConnection').promise();

exports.editUser = async (req, res, next) => {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    const { firstName, lastName, username, email, userType } = req.body;

    try {
        const [result] = await conn.execute(
            "UPDATE `users` SET `firstName`=?, `lastName`=?, `username`=?, `email`=?, `userType`=? WHERE `userId`=?",
            [firstName, lastName, username, email, userType, userId]
        );

        if (result.affectedRows > 0) {
            return res.json({
                status: 'true',
                message: "User updated successfully"
            });
        }

        res.json({
            status: 'false',
            message: "User not found or no changes made"
        });
    } catch (err) {
        next(err);
    }
};
