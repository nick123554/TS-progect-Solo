import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import styles from "./AddCardForm.module.css";
import { useNavigate, type NavigateFunction } from "react-router";
import ProductValidator from "../../entities/products/ProductValidator";
import { ProductApi } from "../../entities/products/ProductApi";

const defaultValue = {
  title: "",
  phone: "",
  
};

export default function AddCardForm(): JSX.Element {
  const [inputs, setInputs] = useState<{
    title:string, phone:string
  }>(defaultValue);

  const nav: NavigateFunction = useNavigate();

  function inputsHandler(e:ChangeEvent<HTMLInputElement>): void {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
    // console.log(inputs)
  }

  const addHandler = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    const valid: {
    isValid: boolean;
    error: string | null;
}  = ProductValidator.validate(inputs);
    // console.log('2-------->', valid)
    try {
      if (valid.isValid) {
        const data = await ProductApi.create(inputs);
        // console.log('2-------->')
        console.log("Adeded data:", data);
        if (data.statusCode === 201) {
          console.log('3-------->')
          nav("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={addHandler}>
        <input
          className={styles.input}
          onChange={inputsHandler}
          value={inputs.title}
          name="title"
          placeholder="Название Компании"
        />
        <input
          className={styles.input}
          onChange={inputsHandler}
          value={inputs.phone}
          name="phone"
          placeholder="Номер телефона"
        />

        
        <button type="submit" className={styles.button}>
          Добавить
        </button>
      </form>
    </div>
  );
}
