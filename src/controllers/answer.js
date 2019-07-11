import express from 'express';
import mongoose from 'mongoose';

import Answer from '../models/answer';
import Question from '../models/question';

const router = express.Router();

//add answer, link to question and answer by passing ID
router.addAnswer = ('/', (req, res, next) => {
    const answer = new Answer({
        question: req.body.question,
        user: req.body.user,
        answer: req.body.answer,
    });
    answer
        .save()
        .then(result => {
            Question.findById(result.question)
                .exec()
                .then(questionData => {
                    res.status(201).json({
                        message: 'added to database',
                        answer: answer,
                        question: questionData,
                    });
                })
                .catch((err) => {
                    console.log(err.message)
                })
        })
        .catch(err => console.log(err));

});

//show all answer using populate with db ref --- see model to get username and question
router.allAnswers = ('/', (req, res) => {
    Answer.find().populate('user question')
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

//edit answer
router.editAnswer = ('/:id', (req, res) => {
    const editAnswer = { 
        answer: req.body.answer,
        };
    Answer.update({ $set: editAnswer })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


export default router;