import express from 'express';
import mongoose from 'mongoose';

import Topic from '../models/topic';

const router = express.Router();

//add topics
router.addTopics = ('/', (req, res, next) => {
    const topic = new Topic({
        topic: req.body.topic
    });
    topic
        .save()
        .then(result => {
            if (result) {
                res.status(201).json({
                    message: 'Added to databse'
                })
            } else {
                res.status(404).json({ message: "Please enter valid topic" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

//get topics
router.allTopics = ('/', (req, res) => {
    Topic.find()
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


