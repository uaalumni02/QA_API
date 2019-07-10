import express from 'express';
import mongoose from 'mongoose';

import Answer from '../models/answer';
import Question from '../models/question';

const router = express.Router();

//add answer and link to questions
router.addAnswer = ('/', (req, res, next) => {
    const answer = new Answer({
        questionId: req.body.questionId,
        answer: req.body.answer,
    });
    answer
        .save()
        .then(result => {
            Question.findById(result.questionId)
                .exec()
                .then(questionData => {
                    res.status(201).json({
                        message: 'added to database',
                        updatedAnswer: answer,
                        question: questionData
                    });
                })
                .catch((err) => {
                    console.log(err.message)
                })
        })
        .catch(err => console.log(err));

});

//show all answers
router.allAnswers = ('/', (req, res) => {
    Answer.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//delete answer
router.removeAnswer = ('/:id', (req, res) => {
    const id = req.params.id;
    Answer.findOneAndDelete({ '_id': id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'removed from database',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


export default router;