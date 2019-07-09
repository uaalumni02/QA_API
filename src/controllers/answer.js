import express from 'express';
import mongoose from 'mongoose';

import Answer from '../models/answer';

const router = express.Router();

//add answer
router.addAnswer = ('/', (req, res, next) => {
    const answer = new Answer({
        answer: req.body.answer,
    });
    answer
        .save()
        .then(result => {
            if (result) {
                res.status(201).json({
                    message: 'Added to databse'
                })
            } else {
                res.status(404).json({ message: "Please enter valid answer" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});


export default router;