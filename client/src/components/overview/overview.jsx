/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RowOne from './RowOne.jsx';
import RowTwo from './RowTwo.jsx';
import Col from 'react-bootstrap/Col'
import axios from 'axios';
import defaultData from './defaultData.js';

const Overview = ({ currentProduct, currentStyle, handleChangeStyle, postUserClick }) => {
  const [productInfo, changeProductInfo]  = useState([])
  const [styleInfo, changeStyleInfo] = useState([])

  useEffect(() => {
    axios.get(`/products/${currentProduct}`)
    .then(results => changeProductInfo(results.data))
    .catch(err => console.error('Not able to obtain product info at overview product', err))
  }, [currentProduct])

  useEffect(() => {
    axios.get(`/products/${currentProduct}/styles`)
    .then(results => {
      for (var style of results.data) {
        if (style.style_id === currentStyle) {
          changeStyleInfo(style)
        }
      }
    })
    .catch(err => console.error('Not able to obtain style info at overview style', err))
  }, [currentProduct, currentStyle])

    return (
      <Container fluid="md" className="ov-main" data-testid="ov-main" onClick={(e) => postUserClick(e, 'Overview')}>
        <Row>
          <h1>Product Overview</h1>
        </Row>
        <Row>
          <RowOne productInfo={productInfo} styleInfo={styleInfo} handleChangeStyle={handleChangeStyle}/>
        </Row>
        <Row>
          <RowTwo productInfo={productInfo}/>
        </Row>
      </Container>

    )
}


export default Overview;