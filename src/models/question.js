import mongoose from 'mongoose';
const Schema = mongoose.Schema;

  
  const questionSchema = mongoose.Schema({
    question: {
        type: String, 
        required: [true, 'question is required'], 
        min:5, 
        max: 200,
    },
    description: {
      type: String, 
      required: [true, 'description is required'], 
      min:5, 
      max: 700,
  },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
});



export default mongoose.model('Question', questionSchema);