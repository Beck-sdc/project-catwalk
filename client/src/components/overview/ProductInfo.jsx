/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ProductInfo = ({ productInfo }) => {
  return (
    <Col className='col2' xs={7} data-testid="product-info">
      <Container className="ov-product-info">
        <Form >
          <Form.Group >
            <Form.Label><h5>Product information</h5></Form.Label>
            <Form.Control className="ov-textarea" as="textarea" rows={6} plaintext readOnly defaultValue={productInfo.description} />
          </Form.Group>
        </Form>
      </Container>
    </Col>
  )
}
export default ProductInfo;