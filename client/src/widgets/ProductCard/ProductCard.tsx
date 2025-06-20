import  { type JSX } from "react";
import { useNavigate } from "react-router";
import type { ProductT } from "../../entities/users/types/ProductTypes";

type ProductCardPropsT = {
  el: ProductT;
  // deleteHandler: (id:number) => void
}
// 

export default function ProductCard({ el }: ProductCardPropsT): JSX.Element {
  // const [productCard, setProductcard] = useState(el);
  const nav = useNavigate();
  console.log("01----->", el);

  const handleClick = (): void => {
    nav(`/products/${el.id}`);
  };

  // const handleDelete = (e) => {
  //   e.stopPropagation();
  //   deleteHandler(el.id);
  // };

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
      <h3>{el.title}</h3>
      <p>{el.phone}</p>
      
      
    </div>
  );
}
