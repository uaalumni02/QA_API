import express from 'express';
import mongoose from 'mongoose';

//import model
import Question from '../models/question';
// import controller
import questionController from '../controllers/question';

const router = express.Router();


// Insert JSON straight into MongoDB
router.post('/', questionController.addQuestions);


export default router;