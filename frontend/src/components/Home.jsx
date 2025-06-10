import React, { Fragment, useEffect } from 'react'
import MetaData from './layouts/metaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productsActions';
import Loader from './layouts/Loader';
import Product from './product/Product';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const dispatch = useDispatch();
  const { products , loading ,error} = useSelector((state) => state.productState);
  useEffect(() => {
    console.log("Error:", error);
    if(error){
      return toast.error(error,{
        position: "bottom-center"
      })
    }
    dispatch(getProducts())
  },[error])

  return (
    <Fragment>
    {loading ? <Loader/> : null}
    <>
      <MetaData title={'Home'}/>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
        {Array.isArray(products) && products.length > 0 ? products.map(product => (
              <Product product={product}/>
        )) : <></>}
        </div>
      </section>
      <ToastContainer/>
    </>
    </Fragment>
  )
}

export default Home;