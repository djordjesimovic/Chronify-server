const express = require('express');
const routes = require('./routes');
const cors = require('cors')


const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Server is running',
    })
});

// app.get('/users', (req, res) => {
//     res.status(200).send(users)
// })

app.listen(3000,() => console.log('Server is running on http://localhost:3000'));