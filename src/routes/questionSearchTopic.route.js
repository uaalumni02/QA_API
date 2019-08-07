import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

import Question from '../models/question';
// import controller
import questionController from '../controllers/question';

const router = express.Router();

//search appt by topic ID
router.get('/:topic', checkAuth, questionController.searchQuestion)

export default router;