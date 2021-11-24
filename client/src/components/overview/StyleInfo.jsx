/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import StarRatings from '../StarRatings.jsx';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import useDeepCompareEffect from 'use-deep-compare-effect';
import RatingsAndReviews from '../RatingsAndReviews/RatingsAndReviews.jsx';

const StyleInfo = ({ productInfo, styleInfo, handleChangeStyle }) => {

  const isFirstRef = useRef(true);
  const [size, changeSize] = useState(() => { return 'Select a Size' });
  const [sizeAndQuantOptions, changeSizeAndQuantOptions] = useState([]);
  const [storedQuantity, changeStoredQuantity] = useState();
  const [availableQuantity, changeAvailableQuantity] = useState([]);
  const [displayQuantity, changeDisplayQuantity] = useState(() => { return 'Quantity' });
  const [styleThumbnails, changeThumbnails] = useState([]);
  const [numberOfReviews, changeNumberOfReviews] = useState([])
  const [availabeSkus, changeAvailableSkus] = useState([])
  const [currentSku, changeCurrentSku] = useState([])
  const [sessionId, setSessionId] = useState()
  const [executed, setExecuted] = useState(false)

  useEffect(() => {
    if (productInfo.product_id >= 1) {
      axios.get(`/products/${productInfo.product_id}/styles`)
        .then(results => {
          changeThumbnails(results.data[0].results)
        })
        // .then(axios.get(`/reviews/${productInfo}`)
        //   .then(results => {
        //     changeNumberOfReviews(results.data.results.length)
        //   }))
        .catch(err => console.error('unable to obtain style info at styleInfo,jsx', err))

    }
  }, [productInfo.product_id])


  useDeepCompareEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }
    const availableSkuValues = Object.values(styleInfo.skus)
    const availabeSkuKeys = Object.keys(styleInfo.skus)
    changeAvailableSkus(availabeSkuKeys)
    changeSizeAndQuantOptions(availableSkuValues)

    return () => {
      changeSize('Select a Size')
      changeCurrentSku([])
    }
  }, [styleInfo])

  useEffect(() => {
    const values = Array.from({ length: storedQuantity }, (_, i) => i + 1);
    changeAvailableQuantity(values);

    return () => {
      changeAvailableQuantity([])
      changeDisplayQuantity('Quantity')
    }
  }, [storedQuantity, size])


  let selectedStyle = { border: 'none' }
  let originalPrice = { fontWeight: 'bold' }
  let originalSalePrice = { textDecoration: 'line-through', color: 'gray' }
  let salePrice = { fontWeight: 'bold', color: 'red', fontSize: '20px' }
  let saleStatus = styleInfo.sale_price;

  let priceLabel = saleStatus ?
    <div><label style={originalSalePrice}>${styleInfo.original_price}.00</label> <label style={salePrice}>${styleInfo.sale_price}</label> </div>
    : <label style={originalPrice}>${styleInfo.original_price}.00</label>

  const addToCart = (skuId, quantity) => {
    if (quantity.length > 2) {
      alert('Whoops, unable to add item to cart, please try again')
      return
    }
    const product = {
      user_session: sessionId,
      product_id: 1,
      active: 1,
      sku_id: skuId,
      quantity: quantity,
    }
    console.log(product)
    axios.post(`/cart`, product)
      .then(() => {
        alert('Successfully added item to cart')
      })
      .catch(err => {
        alert('Whoops, unable to add item to cart, please try again')
      })
  }

  const handleCreateUserSession = () => {
    if (executed === false) {
      setExecuted(true);
      let sessionID = Math.floor(Math.random() * 10000)
      setSessionId(sessionID)
    }
  }
  handleCreateUserSession()

  return (
    <Col className="ov-styles" data-testid="style-info">
      <Stack >
        <div>
          <StarRatings rating={productInfo.averageRating} />  <br /> Read all {numberOfReviews} reviews
        </div>
        <div>
          <h4>{productInfo.category}</h4>
          <h3>{productInfo.name}</h3>
          {priceLabel}
        </div>
      </Stack>
      <Stack>
        <div >
          Selected Style &gt; <br />
          <label className="ov-style-name">{styleInfo.name}</label>
          <div className="ov-styles-thumbnail-container">
            {styleThumbnails.map((style, index) => {
              if (style.style_id === styleInfo.style_id) {
                selectedStyle = {
                  border: '3px solid lightskyblue'
                }
              } else {
                selectedStyle = { border: 'none' }
              }
              return <img src={style.photos[0].thumbnail_url} key={style.style_id} id={style.style_id} onClick={() => handleChangeStyle(event)} style={selectedStyle} className="ov-styles-thumbnails" />
            })}
          </div>
        </div>
      </Stack>
      <Stack className="ov-add-to-cart">
        <div>
          <SplitButton size="sm" variant="secondary" title={size}>
            <Dropdown.Header>Please select a size</Dropdown.Header>
            {sizeAndQuantOptions.map((sku, index) => {
              return <Dropdown.Item onClick={() => {
                changeSize(`${sku.size}`)
                changeStoredQuantity(`${sku.quantity}`)
                changeCurrentSku(`${availabeSkus.slice(index, index + 1)}`)
              }} key={index}>{sku.size}</Dropdown.Item>
            })}
          </SplitButton>
          <SplitButton size="sm" variant="secondary" title={displayQuantity}>
            <Dropdown.Header>Quantity</Dropdown.Header>
            {availableQuantity.slice(0, 15).map((number, index) => {
              return <Dropdown.Item onClick={() => changeDisplayQuantity(`${number}`)} key={index}>{number}</Dropdown.Item>
            })}
          </SplitButton>
        </div>
        <Button variant="primary" size="sm" onClick={() => {
          addToCart(Number(currentSku), Number(displayQuantity))
        }}>Add To Cart</Button>{' '}
      </Stack>
    </Col>
  );
};

export default StyleInfo;
