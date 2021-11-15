const getAverageRating = require('./helpers/getAverageRating.js');
const getDefaultStyle = require('./helpers/getDefaultStyle.js');
const TOKEN = require('../../config.js').TOKEN;
const axios = require('axios');
const API_URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax`

let config = {
  headers: {
    'Authorization': TOKEN
  }
}

module.exports = {
  // return list of reviews for specific product
  getOne: (req, res) => {
    let id = req.params.product_id;
    
    axios.get(`${API_URL}/reviews/?product_id=${id}`, config)
      .then(result => {
        console.log(`Successfully retrieved all reviews for product id: ${id}`)
        res.status(200).send(result.data)
      })
      .catch(err => {
        console.error('Cannot retrieve reviews')
        res.status(400).send(err)
      })
  },
  // return review metadata for a given product
  getReviewMetadata: (req, res) => {
    let productId = req.params.product_id;

    axios.get(`${API_URL}/reviews/meta?product_id=${productId}`, config)
      .then(results => {
        let product = results.data;
        // retrieve average ratings and add as prop to product
        return getAverageRating(product.product_id)
          .then(avgRating => {
            product['avgRating'] = avgRating || null;
            // retrieve default style and add as prop to product
            return getDefaultStyle(product.product_id)
              .then(defaultStyle => {
                product['defaultStyle'] = defaultStyle;
                return product;
              })
          })
      })
      .then(results => res.status(200).send(results))
      .catch(err => {
        console.log('failed to retrieve product metadata: ')
        res.status(401).send(err);
      })
  },

  addReview: (req, res) => {
    let reviewBody = {
      product_id: req.body.product_id,
      rating: req.body.rating, 
      summary: req.body.summary,
      body: req.body.body,
      recommend: req.body.recommend,
      name: req.body.name,
      email: req.body.email,
      photos: req.body.photos,
      characteristics: req.body.characteristics
    }
  
    axios.post(`${API_URL}/reviews`, reviewBody, config)
      .then(() => {
        res.status(201).send('Successfully added review! ', reviewBody)
      })
      .catch(err => {
        console.log('Unable to add review.. ', err.response.data)
        res.status(400).send()
      })
  },
  
  markHelpful: (req, res) => {
    let review_id = req.body.review_id;
    axios.put(`${API_URL}/reviews/${review_id}/helpful`, null, config)
      .then(() => {
        console.log('Successfully marked review as helpful!')
        res.status(204).send()
      })
      .catch(err => {
        console.error('Cannot mark review as helpful...')
        res.status(500).send(err)
      })
  },

  reportReview: (req, res) => {
    let review_id = req.body.review_id;
    axios.put(`${API_URL}/reviews/${review_id}/report`, null, config)
      .then(() => {
        console.log('Succesfully reported review')
        res.status(204).send()
      })
      .catch(err => {
        console.error('Cannot report review...')
        .res.status(500).send(err)
      })
  } 
}