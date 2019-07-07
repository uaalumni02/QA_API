import mongoose from 'mongoose';
const Schema = mongoose.Schema;

  
  const questionSchema = mongoose.Schema({
    
    question: {
        type: String, 
        required: [true, 'question is required'], 
        min:5, 
        max: 200,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'topics',
    },
});



export default mongoose.model('Question', questionSchema);