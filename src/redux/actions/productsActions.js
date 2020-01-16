import axios from 'axios';

export const START_LOAD_PRODUCTS = 'START_LOAD_PRODUCTS';
export const SUCCESS_LOAD_PRODUCTS = 'SUCCESS_LOAD_PRODUCTS';
export const FAILED_LOAD_PRODUCTS = 'FAILED_LOAD_PRODUCTS';


const API_URL = 'http://jsonplaceholder.typicode.com';
const url = `${API_URL}/users/`;

export function fetchProductsBegin(data) {
  return {
    type: START_LOAD_PRODUCTS,
    data,
  };
}
export function fetchProductsSuccess(data) {
  return {
    type: SUCCESS_LOAD_PRODUCTS,
    data,
  };
}
export function fetchProductsFailure(data) {
  return {
    type: FAILED_LOAD_PRODUCTS,
    data,
  };
}
export function fetchProducts() {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    axios.get(url)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchProductsSuccess(json.data));
        return json.products;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}
