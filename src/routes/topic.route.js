import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check-auth';

//import model
import Topic from '../models/topic';
// import controller
import topicController from '../controllers/topic';

const router = express.Router();


// Insert JSON straight into MongoDB
router.post('/', checkAuth, topicController.addTopics);

//shows all data
router.get('/', checkAuth, topicController.allTopics);


export default router;