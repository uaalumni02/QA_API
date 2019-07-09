import mongoose from 'mongoose';
const Schema = mongoose.Schema;

  
  const answerSchema = mongoose.Schema({
    
    answer: {
        type: String, 
        required: [true, 'answer is required'], 
        min:2, 
        max: 200,
    },
});



export default mongoose.model('Answer', answerSchema);