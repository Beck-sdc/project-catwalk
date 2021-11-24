const TOKEN = require('../../config.js').TOKEN;
const axios = require('axios');
const API_URL = `http://localhost:3001`

let config = {
  headers: {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
  }
}

module.exports = {
  getCart: (req, res) => {
    axios.get(`${API_URL}/cart/`, config)
      .then(results => {
        console.log('all items in cart successfully obtained')
        res.status(200).send(results.data)
      })
      .catch(err => {
        console.error('unable to obtain items in cart')
        res.status(400).send(err)
      })
  },

  addToCart: (req, res) => {

    const product = {
      sku_id: req.body.sku_id,
      count: req.body.count
    }

    axios.post(`${API_URL}/cart/`, product, config)
      .then(() => {
        console.log('Successfully added item to cart')
        res.status(201).send()
      })
      .catch(err => {
        console.error('Unable to add item to cart')
        res.status(400).send(err)
      })

  }
}
