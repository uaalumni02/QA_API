import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

//import model
import Question from '../models/question';
// import controller
import questionController from '../controllers/question';

const router = express.Router();


//get question by question ID
router.get('/:id', checkAuth, questionController.getQuestionById);;
//delete question from the DB
router.delete('/:id', checkAuth, questionController.deleteQuestion);
//edit question
router.patch('/:id', checkAuth, questionController.editQuestion);
// shows all data
router.get('/', checkAuth, questionController.allQuestions);
// Insert JSON straight into MongoDB
router.post('/', checkAuth, questionController.addQuestion);






export default router;