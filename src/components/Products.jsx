import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";

function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [searchedProduct, setSearchedProduct] = useState("");
  const product = useParams();
  const [cartValue, setCartValue] = useOutletContext();
  useEffect(() => {
    getProductList();
    setCartValue(0);
  }, [product?.categoryName, setCartValue]);
  const getProductList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${product?.categoryName}`
      );
      setProducts(res?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setSearchedProduct(e.target.value.toLowerCase());
  };
  return (
    <div className="Products">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Category List</h1>
          <input type="text" onChange={handleChange} />
          <div className="container">
            {products
              ?.filter((product) =>
                product.title.toLowerCase().includes(searchedProduct)
              )
              ?.map((product) => (
                <Link
                  to={`/${product.category}/${product.id}`}
                  key={product.id}
                  className="card"
                >
                  <img src={product.image} alt={product?.title}/>
                  <div className="texts">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <button>More Details</button>
                  </div>
                </Link>
              ))}
          </div>
          <Outlet context={[cartValue, setCartValue]} />
        </div>
      )}
    </div>
  );
}

export default Products;
