import express from 'express';
import checkAuth from '../middleware/check-auth';

// import controller
import userController from '../controllers/user';

const router = express.Router();

//create user
router.post('/', userController.createUser);
//user login
router.post('/login', userController.logIn);
//delete user
router.delete('/:id', userController.removeUser);
//shows all user
router.get('/', checkAuth, userController.getAllUsers);
//show user by id
router.get('/:id', checkAuth, userController.showUserById);

export default router;