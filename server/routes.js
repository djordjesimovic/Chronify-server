const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const {getAllUsers} = require('./controllers/getAllUsersController');
const {deleteUser} = require('./controllers/deleteUserController');
const { editUser } = require('./controllers/editUserController');
const {insertTask} = require('./controllers/insertTaskController');
const {getTasksForLoggedInUser} = require('./controllers/getTasksForLoggedInUserController');
const {deleteTask} = require('./controllers/deleteTaskController');
const {editTask} = require('./controllers/editTaskController');
const {getAllTasks} = require('./controllers/getAllTasksController');
const {completeTask} = require('./controllers/taskCompleteController');
const {toggleTaskInProgress} = require ('./controllers/toggleTaskInProgressController');
const {approveTask} = require('./controllers/approveTaskController');

router.post('/register', [
    body('username',"The username must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);
router.get('/getAllUsers',getAllUsers);
router.delete('/users/:userId', deleteUser);
router.put('/users/:userId', editUser);
router.post('/insertTask', insertTask);
router.get('/tasks/:userId', getTasksForLoggedInUser);
router.delete('/tasks/:taskId', deleteTask);
router.put('/tasks/:taskId', editTask);
router.get('/tasks', getAllTasks);
router.put('/tasks/:taskId/complete', completeTask);
router.put('/tasks/:taskId/toggle-progress', toggleTaskInProgress);
router.put('/tasks/:taskId/approve', approveTask);

module.exports = router;