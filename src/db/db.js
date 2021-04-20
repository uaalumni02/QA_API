class Db {
  static async addNewTopic(model, data) {
    const newTopic = new model({ ...data });
    return newTopic
      .save()
      .then((res) => {
        const { topic } = res,
          topicData = { topic };
        return topicData;
      })
      .catch((error) => {
        return { error };
      });
  }
  static async getAllTopics(model) {
    try {
      const allTopics = await model.find({});
      return allTopics;
    } catch (error) {
      throw error;
    }
  }
  static async addNewQuestion(model, data) {
    const newQuestion = new model({ ...data });
    return newQuestion
      .save()
      .then((res) => {
        //passing topic and user id's
        const { question, description, topic, user } = res,
          questionData = { question, description, topic, user };
        return questionData;
      })
      .catch((error) => {
        return { error };
      });
  }
  static async getAllQuestions(model) {
    try {
      const allQuestions = await model.find({}).populate("user topic").exec();
      return allQuestions;
    } catch (error) {
      throw error;
    }
  }
  static async deleteQuestion(model, id) {
    try {
      const deleteQuestion = await model.findOneAndDelete({ _id: id });
      return deleteQuestion;
    } catch (error) {
      throw error;
    }
  }
  static async editQuestion(model, data) {
    try {
      const editQuestion = await model.update({ ...data });
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getQuestionByTopic(model, topic) {
    try {
      const questions = await model
        .find({ topic })
        .populate("user topic")
        .exec();
      return questions;
    } catch (error) {
      throw error;
    }
  }
  static async getQuestionById(model, id) {
    try {
      const question = await model.findById(id).populate("user topic").exec();
      return question;
    } catch (error) {
      throw error;
    }
  }
  static async editAnswer(model, data) {
    try {
      const editAnswer = await model.update({ ...data });
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async addAnswer(model, data) {
    const newAnswer = new model({ ...data });
    return newAnswer
      .save()
      .then((res) => {
        //passing question and user id's
        const { answer, question, user } = res,
          AnswerData = { answer, question, user };
        return AnswerData;
      })
      .catch((error) => {
        return { error };
      });
  }
  static async deleteAnswer(model, id) {
    try {
      const deleteAnswer = await model.findOneAndDelete({ _id: id });
      return deleteAnswer;
    } catch (error) {
      throw error;
    }
  }

  static async getAnswerByQuestion(model, question) {
    try {
      const answer = await model
        .findById(question )
        .populate("user question")
        .exec();
      return answer;
    } catch (error) {
      throw error;
    }
  }
  static async getTopicById(model, id) {
    try {
      const topic = await model.findById(id);
      return topic;
    } catch (error) {
      throw error;
    }
  }
  static async findUser(model, username) {
    try {
      const user = await model.findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async saveUser(model, user) {
    try {
      const newUser = await model({ ...user });
      return newUser.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers(model) {
    try {
      const allUsers = await model.find({});
      return allUsers;
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(model, id) {
    try {
      const user = await model.findById(id)
      return user
    } catch (error) {
      throw error;
    }
  }
}
export default Db;
