import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import RelatedProductCard from './RelatedProductCard.jsx';

const RelatedProductsList = ({ currentProduct, handleChangeProduct }) => {
  const [products, setProducts] = useState([]);
  const currentProductId = currentProduct.product_id;
  // TODO: add spinner to list
  // useEffect(() => {
  //   axios.get(`/products/${currentProductId}/related`)
  //     .then(results => setProducts(results.data))
  //     .catch(err => console.error(err));
  // }, [currentProduct]);

  return (
    <CarouselProvider
      className="rel-products-list"
      naturalSlideWidth={300}
      naturalSlideHeight={450}
      totalSlides={products.length}
      visibleSlides={4}
    >
      <div data-testid='related-prod-list'>
        <Slider>
          {products.map((product, i) => (
            <RelatedProductCard
              key={product.id}
              product={product}
              index={i}
              handleChangeProduct={handleChangeProduct}
              card={'related'}
              currentProduct={currentProduct}
            />
          ))}
        </Slider>
        <ButtonBack>{'<'}</ButtonBack>
        <ButtonNext>{'>'}</ButtonNext>
      </div>
    </CarouselProvider>
  )
}

RelatedProductsList.propTypes = {
  currentProduct: PropTypes.object,
  handleChangeProduct: PropTypes.func
};

export default RelatedProductsList;