import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartValue, setCartValue] = useState(0);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="Home">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Home</h1>
            <button style={{ width: "100px" }}>CART - {cartValue}</button>
          </div>
          <ul>
            {categories?.map((category, id) => (
              <Link to={category} key={id}>
                <li>{category}</li>
              </Link>
            ))}
          </ul>
          <Outlet context={[cartValue, setCartValue]} />
        </div>
      )}
    </div>
  );
}

export default Home;
