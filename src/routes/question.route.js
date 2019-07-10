import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

//import model
import Question from '../models/question';
// import controller
import questionController from '../controllers/question';

const router = express.Router();


// Insert JSON straight into MongoDB
router.post('/', checkAuth, questionController.addQuestions);
//shows all data
router.get('/', checkAuth, questionController.allQuestions);
//search appt by topic ID
router.get('/:topic', checkAuth, questionController.searchQuestion);
//delete question from the DB
router.delete('/:id', checkAuth, questionController.removeQuestion);
//edit question
router.patch('/:id', checkAuth, questionController.editQuestion);

export default router;