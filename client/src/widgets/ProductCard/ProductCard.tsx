import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function ProductCard({ el, deleteHandler }) {
  const [productCard, setProductcard] = useState(el);
  const nav = useNavigate();
  console.log("01----->", el);

  const handleClick = () => {
    nav(`/products/${el.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteHandler(el.id);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "1px solid gray",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h3>{productCard.title}</h3>
      <p>{productCard.phone}</p>
      
      
    </div>
  );
}
