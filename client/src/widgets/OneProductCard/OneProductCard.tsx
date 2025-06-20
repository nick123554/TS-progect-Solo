import {  type JSX } from "react";

import { useNavigate } from "react-router";
import { ProductApi } from "../../entities/products/ProductApi";
import type { ProductT } from "../../entities/users/types/ProductTypes";
// import EditForm from "../../features/EditForm/EditForm";


type OneProductCardPropsT = {
  product: ProductT;
};

export default function OneProductCard( {product}: OneProductCardPropsT): JSX.Element {
  const nav = useNavigate();
  // const [cards, setCards] = useState<ProductT[]>([]);
  

  async function deleteHandler(id:number): Promise<void> {
    try {
      const data = await ProductApi.delete(id);
      if (data.statusCode === 200) {
        // setCards((card) => card.filter((el) => el.id !== id));
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
