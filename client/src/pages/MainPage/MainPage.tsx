import React, { useEffect, useState } from "react";
import { ProductApi } from "../../entities/products/ProductApi";
import ProductCard from "../../widgets/ProductCard/ProductCard";

export default function MainPage() {
  const [products, setProducts] = useState([]);

  async function deleteHandler(id) {
    try {
      const data = await ProductApi.delete(id);
      if (data.statusCode === 200) {
        setProducts((products) => products.filter((el) => el.id !== id));
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await ProductApi.getAll();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      {products.map((el) => (
        <ProductCard key={el.id} el={el} deleteHandler={deleteHandler} />
      ))}
    </div>
  );
}
