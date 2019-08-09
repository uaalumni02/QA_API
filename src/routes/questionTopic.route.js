import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

//import model
import Question from '../models/question';
// import controller
import questionController from '../controllers/question';

const router = express.Router();

//search question by topic ID
router.get('/:topic', checkAuth, questionController.searchQuestion)

export default router;