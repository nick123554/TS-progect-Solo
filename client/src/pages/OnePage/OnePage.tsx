import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router";

// import ProductCard from "../../widgets/ProductCard/ProductCard";
import OneProductCard from "../../widgets/OneProductCard/OneProductCard";
import { ProductApi } from "../../entities/products/ProductApi";
import type { ProductT } from "../../entities/users/types/ProductTypes";



 
export default function OnePage(): JSX.Element {
  const [product, setProduct] = useState<ProductT>({id: 0, title: "", phone: "", authorId: 0});
  // const [editMode, setEditMode] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getOneProduct(): Promise<void> {
      try {
        const data = await ProductApi.getOne(Number(id));
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
      <OneProductCard product={product} />
    </>
  );
}
