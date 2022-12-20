import React from "react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products");
      console.log(result.data);
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.price} />
            </Link>
            <div className="product-ifo">
              <Link to={`/product/${product.slug}`}>
                <p>{product.izina}</p>
              </Link>
              <p>
                {" "}
                <strong>{product.price}Rwf</strong>{" "}
              </p>
              <button>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
