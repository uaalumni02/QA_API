import express from 'express';
import mongoose from 'mongoose';


import Question from '../models/question';

const router = express.Router();


//add questions
router.addQuestions = ('/', (req, res, next) => {
    const question = new Question({
        question: req.body.question
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


export default router;