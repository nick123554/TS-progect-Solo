import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductApi } from "../../entities/products/ProductApi";
import ProductCard from "../../widgets/ProductCard/ProductCard";
import OneProductCard from "../../widgets/OneProductCard/OneProductCard";

export default function OnePage() {
  const [product, setProduct] = useState({});
  // const [editMode, setEditMode] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getOneProduct() {
      try {
        const data = await ProductApi.getOne(id);
        console.log(data);
        if (data.statusCode === 200) {
          setProduct(data.data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getOneProduct();
  }, [id]);

  // const editHeandler = () => {
  //   setEditMode((prev) => !prev);
  // };

  return (
    <>
      <OneProductCard product={product} id={id}/>
    </>
  );
}
