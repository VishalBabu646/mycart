import axios from 'axios'
import {productRequest,productSuccess,productFail} from '../slices/ProductSlice'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch(productRequest());
        const {data} = await axios.get('/api/v1/products');
        dispatch(productSuccess({products : data.product}));
    } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(productFail(error.response.data.message));
    }
}