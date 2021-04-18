import Question from '../models/question';
import Db from '../db/db';

class QuestionData {
    static async addQuestion(req, res) {
        const newQuestionData = { ...req.body };
        try {
            const addQuestions = await Db.addNewQuestion(Question, newQuestionData)
            return res.status(200).json(addQuestions)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async getQuestionById(req, res) {
        const { id } = req.params;
        try {
            const questionsById = await Db.getQuestionById(Question, id)
            return res.status(200).json(questionsById);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async allQuestions(req, res) {
        try {
            const allQuestions = await Db.getAllQuestions(Question)
            return res.status(200).json(allQuestions)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async deleteQuestion(req, res) {
        const { id } = req.params;
        try {
            const questionToDelete = await Db.deleteQuestion(Question, id)
            return res.status(200).json(questionToDelete)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async editQuestion(req, res) {
        const { question, topic, user } = req.body,
            updateQuestion = { question, topic, user };
        try {
            const questionToEdit = await Db.editQuestion(Question, updateQuestion)
            return res.status(200).json(questionToEdit)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    //get questions by topic id
    static async searchQuestion(req, res) {
        const { topic } = req.params;
        try {
            const questionsByTopic = await Db.getQuestionByTopic(Question, topic)
            return res.status(200).json(questionsByTopic)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}
export default QuestionData;
