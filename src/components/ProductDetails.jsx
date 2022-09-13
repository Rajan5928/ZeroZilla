import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";

function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const product = useParams();
  const [cartValue, setCartValue] = useOutletContext();
  useEffect(() => {
    getProductList();
  }, [product?.id]);
  const getProductList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${product?.id}`
      );
      setProducts(res?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="ProductDetails">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Product Details</h1>
          <div className="container">
            <div key={products?.id} className="card">
              <img src={products?.image} alt={products?.title}/>
              <div className="texts">
                <h2>{products?.title}</h2>
                <p>{products?.description}</p>
                <button onClick={() => setCartValue(cartValue + 1)}>
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    setCartValue(cartValue >= 1 ? cartValue - 1 : 0)
                  }
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
