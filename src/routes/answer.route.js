import express from 'express';
import mongoose from 'mongoose';

//import model
import Answer from '../models/answer';
// import controller
import answerController from '../controllers/answer';

const router = express.Router();

// Insert JSON straight into MongoDB
router.post('/', answerController.addAnswer);


export default router;