import Answer from '../models/answer';
import Question from '../models/question';
import * as db from '../db/db';

class AnswerData {
    static async addAnswer(req, res) {
        const newAnswerData = { ...req.body };
        try {
            const addAnswer = await db.addAnswer(Answer, newAnswerData)
            return res.status(200).json(addAnswer)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async deleteAnswer(req, res) {
        const { id } = req.params;
        try {
            const answerToDelete = await db.deleteAnswer(Answer, id)
            return res.status(200).json(answerToDelete)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async editAnswer(req, res) {
        const { answer, question, user } = req.body,
            updateAnswer = { answer, question, user };
        try {
            const answerToEdit = await db.editAnswer(Answer, updateAnswer)
            return res.status(200).json(answerToEdit)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    //get answer by question id
    static async getAnswerByQuestionId(req, res) {
        const { question } = req.params;
        try {
            const answerByQuestion = await db.getAnswerByQuestion(Answer, question)
            return res.status(200).json(answerByQuestion)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}
export default AnswerData;
