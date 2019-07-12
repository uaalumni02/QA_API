import express from 'express';
import mongoose from 'mongoose';


import Question from '../models/question';
// import Topic from '../models/topic';

const router = express.Router();


//add questions
router.addQuestions = ('/', (req, res, next) => {
    const question = new Question({
        question: req.body.question,
        //passing topic id
        topic: req.body.topic,
        //passing in user id
        user: req.body.user,
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
    Question.find().populate('user topic')
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

//search questions by topic ID
router.searchQuestion = ('/:topic', (req, res, next) => {
    const topic = req.params.topic;
    Question.find({ 'topic': topic })
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid ID entered" });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

//delete questions
router.removeQuestion = ('/:id', (req, res) => {
    const id = req.params.id;
    Question.findOneAndDelete({ '_id': id })
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

//edit question
router.editQuestion = ('/:id', (req, res) => {
    const editQuestion = { 
        question: req.body.question,
        };
    Question.update({ $set: editQuestion })
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