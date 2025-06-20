import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ProductApi } from "../../entities/products/ProductApi";
import ProductCard from "../../widgets/ProductCard/ProductCard";

export default function AllProductsPage({ user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await ProductApi.getOneProductsByUser(user.data.id);
        console.log('00----------->', data);
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
        <ProductCard key={el.id} el={el} />
      ))}
    </div>
  );
}
