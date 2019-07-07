import express from 'express';
import mongoose from 'mongoose';


import Question from '../models/question';

const router = express.Router();


//add questions
router.addQuestions = ('/', (req, res, next) => {
    const question = new Question({
        question: req.body.question,
        //passing topic id
        topic: req.body.topic
    });
    question
        .save()
        .then(result => {
            if (result) {
                res.status(201).json({
                    message: 'Added to databse'
                })
            } else {
                res.status(404).json({ message: "Please enter valid question" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});


//show all question
router.allQuestions = ('/', (req, res) => {
    Question.find()
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

export default router;