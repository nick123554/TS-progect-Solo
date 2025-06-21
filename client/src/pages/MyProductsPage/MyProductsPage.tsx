import { type JSX } from "react";
import { useEffect } from "react";
import { useState } from "react";

import ProductCard from "../../widgets/ProductCard/ProductCard";
import { ProductApi } from "../../entities/products/ProductApi";
import type { UserStateT } from "../../entities/users/types/UserTypes";
import type { ProductT } from "../../entities/users/types/ProductTypes";

type MyproductsOagePropsT = {
  user: UserStateT
}


export default function AllProductsPage({ user }: MyproductsOagePropsT): JSX.Element {
  const [products, setProducts] = useState<ProductT[]>([]);

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
      try {
        if (user.data) {
          const { data } = await ProductApi.getOneProductsByUser(Number(user.data.id));
          setProducts(data);
        }
        
        // console.log("00----------->", data);
        
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [user.data]);
  return (
    <div>
      {products.map((el) => (
        <ProductCard key={el.id} el={el} />
      ))}
    </div>
  );
}
