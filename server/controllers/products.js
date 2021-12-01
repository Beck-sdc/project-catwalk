const getAverageRating = require('./helpers/getAverageRating.js');
const getDefaultStyle = require('./helpers/getDefaultStyle.js');
const TOKEN = require('../../config.js').TOKEN;
const axios = require('axios');
const API_URL = `18.191.164.115`

module.exports = {
  getAll: (req, res) => {
    let config = {
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
      }
    }
    axios.get(`${API_URL}/products`)
      .then(results => {
        console.log('all products successfully obtained')
        res.status(200).send(results.data)
      })
      .catch(err => {
        console.error('unable to obtain desired product')
        res.status(400).send(err)
      })
  },

  getOne: (req, res) => {
    let productId = req.params.product_id;
    let config = {
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
      }
    }
    //retrieve all product level information for a specific product id
    axios.get(`${API_URL}/products/${productId}`)
      .then(results => {
        let product = results.data
        // console.log(product)
        return getAverageRating(productId)
          .then(avgRating => {
            product['averageRating'] = (avgRating || null)
            // console.log('results', results.data)
            console.log('product successfully obtained')
            res.status(200).send(product)
          })
      })
      .catch(err => {
        console.error('unable to obtain desired product')
        res.status(400).send(err)
      })
  },

  getProductStyles: (req, res) => {
    let productId = req.params.product_id;
    let config = {
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
      }
    }
    //retrieve styles for specific product id
    axios.get(`${API_URL}/products/${productId}/styles`)
      .then(results => {
        console.log('styles successfully obtained')
        res.status(200).send(results.data)
      })
      .catch(err => {
        console.error('unable to obtain product styles')
        res.status(400).send(err)
      })
  }

  // getRelatedProductIds: (req, res) => {

  //   let productId = req.params.product_id;

  //   // let config = {
  //   //   headers: {
  //   //     'Authorization': TOKEN
  //   //   }
  //   // }

  //   // retrieve all productIds related to current productId
  //   axios.get(`${API_URL}/products/${productId}/related`)
  //     .then(results => {
  //       let uniqResults = [...new Set(results.data)];
  //       // Promise.all is taking an array of API calls with axios
  //       // for each retrieved productId
  //       Promise.all(
  //         // map over each retrieved productId and make an API call
  //         // to retrieve product data
  //         uniqResults.map(id => {
  //           return axios.get(`${API_URL}/products/${id}`, config)
  //             .then(results => {
  //               let product = results.data;
  //               // retrieve average ratings and add as prop to product
  //               return getAverageRating(product.id)
  //                 .then(avgRating => {
  //                   product['avgRating'] = avgRating || null;
  //                   // retrieve default style and add as prop to product
  //                   return getDefaultStyle(product.id)
  //                     .then(defaultStyle => {
  //                       product['defaultStyle'] = defaultStyle;
  //                       return product;
  //                     })
  //                 })
  //             })
  //             .catch(err => console.log('failed to retrieve a product: ', err));
  //         })
  //       )
  // Promise.all waits until all API calls resolve then returns
  // an array of the resolved values
  //     .then(results => {
  //       console.log('retrieved all related products from api');
  //       res.status(201).send(results);
  //     })
  //     .catch(err => console.log('failed to retrieve products: ', err));
  // })
  // .catch(err => {
  //   res.status(401).send(err);
  //   console.log(err);
  // });
  // }
}
