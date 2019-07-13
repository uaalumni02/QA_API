import Topic from '../models/topic';
import * as db from '../db/db';

class TopicData {
    static async addTopics(req, res) {
        const newTopicData = { ...req.body };
        try {
            const addTopics = await db.addNewTopic(Topic, newTopicData)
            return res.status(200).json(addTopics)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async getAllTopics(req, res) {
        try {
            const allTopics = await db.getAllTopics(Topic)
            return res.status(200).json(allTopics)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

export default TopicData;


