import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';

const app = express();

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise

const DB_URL = process.env.MONGO_URL;

// Connect to mongoose
mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
    if (err)
        return console.log('Unable to Connect to MongoDB')
    return console.log('Connection Successful')
})


app.listen(port, () => console.log('server is running'));