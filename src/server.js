import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;


//import routes
import topicRoutes from './routes/topic.route';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


mongoose.Promise = global.Promise

const DB_URL = process.env.MONGO_URL;

// Connect to mongoose
mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
    if (err)
        return console.log('Unable to Connect to MongoDB')
    return console.log('Connection Successful')
})

//middleware to utilize routes
app.use('/api/topic', topicRoutes);


app.listen(port, () => console.log('server is running'));