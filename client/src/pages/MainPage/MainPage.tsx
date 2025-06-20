import { useEffect, useState, type JSX } from "react";

import ProductCard from "../../widgets/ProductCard/ProductCard";
import { ProductApi } from "../../entities/products/ProductApi";
import type { ProductT } from "../../entities/users/types/ProductTypes";

export default function MainPage(): JSX.Element {
  const [products, setProducts] = useState<ProductT[]>([]);

  // async function deleteHandler(id:number): Promise<void> {
  //   try {
  //     const data = await ProductApi.delete(id);
  //     if (data.statusCode === 200) {
  //       setProducts((products) => products.filter((el) => el.id !== id));
  //     } else {
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
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
        <ProductCard key={el.id} el={el} />
      ))}
    </div>
  );
}
