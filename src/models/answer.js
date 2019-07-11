import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const answerSchema = mongoose.Schema({
  question: {
    type: String
  },
  user: {
    type: String
  },

  answer: {
    type: String,
    required: [true, 'answer is required'],
    min: 2,
    max: 200,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
  },
});



export default mongoose.model('Answer', answerSchema);