import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

//import model
import Answer from '../models/answer';
// import controller
import answerController from '../controllers/answer';

const router = express.Router();

// Insert JSON straight into MongoDB
router.post('/', checkAuth, answerController.addAnswer);
//shows all data
router.get('/', checkAuth, answerController.allAnswers);
//delete answer from the DB
router.delete('/:id', checkAuth, answerController.deleteAnswer);
//edit answer
router.patch('/:id', checkAuth, answerController.editAnswer);


export default router;