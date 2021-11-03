import React, { useState, useEffect } from 'react';
// import { Slide } from 'pure-react-carousel';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import ActionButton from './ActionButton.jsx';
import ProductInfo from './ProductInfo.jsx';
import PropTypes from 'prop-types';

const RelatedProductCard = (props) => {

  return (
    <Slide index={props.index}>
      <div className="cards rel-prod-card">
        <img src="assets/product-image-placeholder-300x300.jpeg" style={{ width:'100%' }} />
        <span>
          <ActionButton card={ 'related' }/>
        </span>
        <ProductInfo product={props.product}/>
      </div>
    </Slide>
  )
}

RelatedProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default RelatedProductCard;