import express from 'express';
import mongoose from 'mongoose';

import topicInformation from '../models/topic';

const router = express.Router();

//add topics
router.addTopics = ('/', (req, res, next) => {
    const topicInformation = new topicInformation({
        topicName: req.body.topicName
    });
    topicInformation
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

