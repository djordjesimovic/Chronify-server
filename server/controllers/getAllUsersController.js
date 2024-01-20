const conn = require('../dbConnection').promise();

exports.getAllUsers = async (req,res,next) => {
    try {
        const [rows] = await conn.query(
            "SELECT `userId`, `firstName`, `lastName`, `username`,`email`, `userType` FROM `users`"
        );
        if(rows.length > 0){
            return res.json({
                users:rows
            });
        }
        res.json({
            message:"No user found"
        });
    }
    catch(err) {
        next(err);
    }
}