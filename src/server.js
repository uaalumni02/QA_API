import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;


//import routes
import topicRoutes from './routes/topic.route';
import questionRoutes from './routes/question.route';
import answerRoutes from './routes/answer.route';
import userRoutes from './routes/user.route';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


mongoose.Promise = global.Promise

const DB_URL = process.env.MONGO_URL;
const TEST_DB_URL = process.env.MONGO_TEST_URL;

if (process.env.NODE_ENV == "test") {
    mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }, (err) => {
        if (err)
            return console.log('Unable to Connect to MongoDB')
        return console.log('Connection Successful to test DB')
    })
} else {
    mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
        if (err)
            return console.log('Unable to Connect to MongoDB')
        return console.log('Connection Successful')
    })
}

//middleware to utilize routes
app.use('/api/topic', topicRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/user', userRoutes);


app.listen(port, () => console.log('server is running'));

export default app;