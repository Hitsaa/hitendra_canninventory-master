/* eslint-disable arrow-body-style */
import React from 'react';
import Product from './Products';

const ProductList = ({ products, onAddToCart }) => {
  return products.map((p) => {
    return <Product product={p} key={p.id} onAddToCart={onAddToCart} />;
  });
};

export default ProductList;
