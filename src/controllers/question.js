import Question from '../models/question';
import * as db from '../db/db';

class QuestionData {
    static async addQuestion(req, res) {
        const newQuestionData = { ...req.body };
        try {
            const addQuestions = await db.addNewQuestion(Question, newQuestionData)
            return res.status(200).json(addQuestions)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async allQuestions(req, res) {
        try {
            const allQuestions = await db.getAllQuestions(Question)
            return res.status(200).json(allQuestions)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async deleteQuestion(req, res) {
        const { id } = req.params;
        try {
            const questionToDelete = await db.deleteQuestion(Question, id)
            return res.status(200).json(questionToDelete)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async editQuestion(req, res) {
        const { question, topic, user } = req.body,
            updateQuestion = { question, topic, user };
        try {
            const questionToEdit = await db.editQuestion(Question, updateQuestion)
            return res.status(200).json(questionToEdit)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    //get questions by topic id
    static async searchQuestion(req, res) {
        const { topic } = req.params;
        try {
            const questionsByTopic = await db.getQuestionByTopic(Question, topic)
            return res.status(200).json(questionsByTopic)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

export default QuestionData;
