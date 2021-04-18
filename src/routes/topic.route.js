import express from 'express';
import checkAuth from '../middleware/check-auth';

// import controller
import topicController from '../controllers/topic';

const router = express.Router();

//get topic byID
router.get('/:id', checkAuth, topicController.getTopicById);;
// Insert JSON straight into MongoDB
router.post('/', checkAuth, topicController.addTopics);
//shows all data
router.get('/', checkAuth, topicController.getAllTopics);


export default router;