import express from 'express';
import mongoose from 'mongoose';

//import model
import topicInformation from '../models/topic';
// import controller
import topicController from '../controllers/topic';

const router = express.Router();


// Insert JSON straight into MongoDB
router.post('/', topicController.addTopics);


export default router;