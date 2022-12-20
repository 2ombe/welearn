import React from "react";
import data from "../data";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <div>
      <h1>products</h1>
      <div className="products">
        {data.products.map((product) => (
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