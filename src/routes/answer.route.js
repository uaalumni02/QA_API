import express from 'express';
import mongoose from 'mongoose';

//import model
import Answer from '../models/answer';
// import controller
import answerController from '../controllers/answer';

const router = express.Router();

// Insert JSON straight into MongoDB
router.post('/', answerController.addAnswer);
//shows all data
router.get('/', answerController.allAnswers);
//delete answer from the DB
router.delete('/:id', answerController.removeAnswer);
//edit answer
router.patch('/:id', answerController.editAnswer);


export default router;