const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbConnection').promise();


exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [req.body.email]
        );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
                status: "false"
            });
        }

        // console.log(req.body.password)
        // console.log(row[0].password)
        // console.log(req.body.password === row[0].password)
        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        //console.log(passMatch)
        // const passMatch = (req.body.password === row[0].password)
        // if(!passMatch){
        //     return res.status(422).json({
        //         message: "Incorrect password",
        //         status: "false"
        //     });
        // }
        if(req.body.password !== row[0].password) {
            return res.status(422).json({
                message: "Incorrect password",
                status: "false"
            });
        }

        const theToken = jwt.sign({userId:row[0].userId},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            token:theToken,
            status: "true",
            userType: row[0].userType,
            userId: row[0].userId,
            firstName: row[0].firstName,
            lastName: row[0].lastName,
            username: row[0].username,
            email: row[0].email,
        });

    }
    catch(err){
        next(err);
    }
}