import Topic from "../models/topic";
import Db from "../db/db";

class TopicData {
  static async addTopics(req, res) {
    const newTopicData = { ...req.body };
    try {
      const addTopics = await Db .addNewTopic(Topic, newTopicData);
      return res.status(200).json(addTopics);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async getAllTopics(req, res) {
    try {
      const allTopics = await Db .getAllTopics(Topic);
      return res.status(200).json(allTopics);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async getTopicById(req, res) {
    const { id } = req.params;
    try {
      const topicById = await Db .getTopicById(Topic, id);
      return res.status(200).json(topicById);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
export default TopicData;
