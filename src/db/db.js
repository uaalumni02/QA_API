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