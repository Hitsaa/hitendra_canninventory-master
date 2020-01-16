/* eslint-disable arrow-body-style */
import React from 'react';
import Plant from './Plants';

const PlantsList = ({ plants, onAddToCart }) => {
  return plants.map((p) => {
    return <Plant plant={p} key={p.id} onAddToCart={onAddToCart} />;
  });
};

export default PlantsList;
