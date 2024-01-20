const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
                status: 'false'
            });
        }
        const [row2] = await conn.execute(
            "SELECT `username` FROM `users` WHERE `username`=?",
            [req.body.username]
        )
        if(row2.length > 0) {
            return res.status(201).json({
                message: "The Username is already in use",
                status: 'false'
            });
        }

        //const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `users`(`firstName`, `lastName`, `username`,`email`,`password`, `userType`) VALUES(?,?,?,?,?,?)',[
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.userType
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
                status: 'true'
            });
        }
        
    }catch(err){
        next(err);
    }
}