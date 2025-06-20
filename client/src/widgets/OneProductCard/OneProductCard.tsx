import React, { useState } from "react";
import { ProductApi } from "../../entities/products/ProductApi";
import { useNavigate, useParams } from "react-router";
// import EditForm from "../../features/EditForm/EditForm";

export default function OneProductCard({ product, id }) {
  const nav = useNavigate();
  const [cards, setCards] = useState([]);
  console.log(id);

  async function deleteHandler(id) {
    try {
      const data = await ProductApi.delete(id);
      if (data.statusCode === 200) {
        setCards((card) => card.filter((el) => el.id !== id));
        nav("/");
        console.log("0--------------->");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } //
  }

  return (
    <>
      <div
        style={{
          cursor: "pointer",
          border: "1px solid gray",
          margin: "10px",
          padding: "10px",
        }}
      >
        <h3>{product.title}</h3>
        <p>{product.phone}</p>

        <button
          onClick={() => {
            deleteHandler(product.id);
          }}
        >
          Удалить
        </button>
        <button
          onClick={() => {
            nav(`/edit/${product.id}`);
          }}
        >
          Редактировать
        </button>
      </div>
    </>
  );
}
