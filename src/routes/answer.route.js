import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

//import model
import Answer from '../models/answer';
// import controller
import answerController from '../controllers/answer';

const router = express.Router();

//get answer by question ID
router.get('/:question', checkAuth, answerController.getAnswerByQuestionId)
// Insert JSON straight into MongoDB
router.post('/', checkAuth, answerController.addAnswer);
//delete answer from the DB
router.delete('/:id', checkAuth, answerController.deleteAnswer);
//edit answer
router.patch('/:id', checkAuth, answerController.editAnswer);


export default router;