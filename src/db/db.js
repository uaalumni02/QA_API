export const addNewTopic = async (model, data) => {
    const newTopic = new model({ ...data });
    return newTopic.save()
      .then(res => {
        const { topic } = res, topicData = { topic }
        return topicData
      })
      .catch(error => {
        return { error }
      })
  }

export const getAllTopics = async model => {
    try {
      const allTopics = await model.find({});
      return allTopics
    } catch (error) {
      throw error;
    }
  }

  export const addNewQuestion = async (model, data) => {
    const newQuestion = new model({ ...data });
    return newQuestion.save()
      .then(res => {
          //passing topic and user id's
        const { question, topic, user } = res, questionData = { question, topic, user }
        return questionData
      })
      .catch(error => {
        return { error }
      })
  }

  export const getAllQuestions = async model => {
    try {
      const allQuestions = await model.find({}).populate('user topic').exec()
      return allQuestions
    } catch (error) {
      throw error;
    }
  }

  export const deleteQuestion = async (model, id) => {
    try {
      const deleteQuestion = await model.findOneAndDelete({ _id: id })
      return deleteQuestion
    } catch (error) {
      throw error
    }
  }

  export const editQuestion = async (model, data) => {
    try {
      const editQuestion = await model.update({ ...data })
      return data
    } catch (error) {
      throw error
    }
  }

  export const getQuestionByTopic = async (model, topic) => {
    try {
      const questions = await model.find({ topic })
      return questions
    } catch (error) {
      throw error;
    }
  }

  export const getAllAnswers = async model => {
    try {
      const allAnswers = await model.find({}).populate('user question').exec()
      return allAnswers
    } catch (error) {
      throw error;
    }
  }

  export const editAnswer = async (model, data) => {
    try {
      const editAnswer = await model.update({ ...data })
      return data
    } catch (error) {
      throw error
    }
  }

  export const addAnswer = async (model, data) => {
    const newAnswer = new model({ ...data });
    return newAnswer.save()
      .then(res => {
          //passing question and user id's
        const { answer, question, user } = res, AnswerData = { answer, question, user}
        return AnswerData
      })
      .catch(error => {
        return { error }
      })
  }
  export const deleteAnswer = async (model, id) => {
    try {
      const deleteAnswer = await model.findOneAndDelete({ _id: id })
      return deleteAnswer
    } catch (error) {
      throw error
    }
  }