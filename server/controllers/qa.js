const TOKEN = require('../../config.js').TOKEN;
const axios = require('axios');
const API_URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax`


let config = {
  headers: {
    'Authorization': TOKEN
  }
}

module.exports = {
  getAllQuestions: (req, res) => {
    var product_id = req.params.product_id
    axios.get(`${API_URL}/qa/questions?product_id=${product_id}`, config)
      .then(results => {
        console.log(`All questions for product ${product_id} have been retrieved.`)
        res.status(200).send(results.data)
      })
      .catch(err => {
        console.error(`Unable to retrieve all questions for product ${product_id}`)
        res.status(400).send(err)
      })
  },

  getAllAnswers: (req, res) => {
    var question_id = req.params.question_id
    axios.get(`${API_URL}/qa/questions/${question_id}/answers`, config)
      .then(results => {
        console.log(`All answers for question ${question_id} have been retrieved.`)
        res.status(200).send(results.data)
      })
      .catch(err => {
        console.error(`Unable to retrieve all answers for question ${question_id}`)
        res.status(400).send(err)
      })
  },

  markAnswerAsHelpful: (req, res) => {
    var answer_id = req.params.answer_id
    axios.put(`${API_URL}/qa/answers/${answer_id}/helpful`, {}, config)
      .then(() => {
        console.log('Successfully marked answer as helpful.')
        res.status(204).send()
      })
      .catch(err => {
        console.error('Unsuccessfully marked answer as helpful.')
        res.status(400).send(err)
      })
  },

  markQuestionAsHelpful: (req, res) => {
    var question_id = req.params.question_id
    axios.put(`${API_URL}/qa/questions/${question_id}/helpful`, {}, config)
      .then(() => {
        console.log('Successfully marked question as helpful.')
        res.status(204).send()
      })
      .catch(err => {
        console.error('Unsuccessfully marked question as helpful.')
        res.status(400).send(err)
      })
  },

  postQuestion: (req, res) => {
    var product_id = req.params.product_id

    var question = {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      product_id: req.body.product_id
    }
    console.log(question)
    axios.post(`${API_URL}/qa/questions?product_id=${product_id}`, question, config)
      .then(() => {
        console.log('Successfully posted question.')
        res.status(201).send()
      })
      .catch(err => {
        console.error('Unsuccessfully posted question.')
        res.status(400).send(err)
      })
  },

  postAnswer: (req, res) => {
    var question_id = req.params.question_id

    var answer = {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      photos: req.body.photos
    }

    axios.post(`${API_URL}/qa/questions/${question_id}/answers`, answer, config)
      .then(() => {
        console.log('Successfully posted answer.')
        res.status(201).send()
      })
      .catch(err => {
        console.error('Unsuccessfully posted answer.')
        res.status(400).send(err)
      })
  },

  reportQuestion: (req, res) => {
    var question_id = req.params.question_id
    axios.put(`${API_URL}/qa/questions/${question_id}/report`, {}, config)
      .then(() => {
        console.log('Successfully reported question.')
        res.status(204).send()
      })
      .catch(err => {
        console.error('Unsuccessfully reported question.')
        res.status(400).send(err)
      })
  },

  reportAnswer: (req, res) => {
    var answer_id = req.params.answer_id
    axios.put(`${API_URL}/qa/answers/${answer_id}/report`, {}, config)
      .then(() => {
        console.log('Successfully reported answer.')
        res.status(204).send()
      })
      .catch(err => {
        console.error('Unsuccessfully reported answer.')
        res.status(400).send(err)
      })
  }
}

