import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const isValidTopic = (topic) => {
    const regExp = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/i
    return regExp.test(topic)
  };
  
  const topicSchema = mongoose.Schema({
    
    topic: {
        type: String, 
        required: [true, 'topic is required'], 
        min:2, 
        max: 12,
        validate: [isValidTopic, 'Please enter valid topic'],
    },
});



export default mongoose.model('Topic', topicSchema);
