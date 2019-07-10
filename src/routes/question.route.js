import express from 'express';
import mongoose from 'mongoose';

//import model
import Question from '../models/question';
// import controller
import questionController from '../controllers/question';

const router = express.Router();


// Insert JSON straight into MongoDB
router.post('/', questionController.addQuestions);
//shows all data
router.get('/', questionController.allQuestions);
//search appt by topic ID
router.get('/:topic', questionController.searchQuestion);
//delete question from the DB
router.delete('/:id', questionController.removeQuestion);

export default router;