import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ProductApi } from "../../entities/products/ProductApi";
import ProductValidator from "../../entities/products/ProductValidator";

const defaultValue = {
  title: "",
  phone: "",
  
};

export default function EditForm() {
  const [inputs, setInputs] = useState(defaultValue);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await ProductApi.getOne(id);
        if (res.statusCode === 200) {
          setInputs(res.data);
        } else {
          console.log("Ошибка получения продукта", res);
        }
      } catch (err) {
        console.error("Ошибка загрузки продукта:", err);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  function inputsHandler(e) {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
    // console.log(inputs)
  }

  const editHandler = async (e) => {
    e.preventDefault();
    const valid = ProductValidator.validate(inputs);

    if (!valid.isValid) return;
    try {
      const res = await ProductApi.update(id, inputs);
      //   console.log('1-------->')
      if (res.statusCode === 201 || res.statusCode === 200) {
        nav("/");
      } else {
        console.log("Ошибка при обновлении", res);
      }
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  return (
    <form onSubmit={editHandler} style={{ padding: "20px" }}>
      <h2>Редактировать </h2>
      <input
        type="text"
        name="title"
        value={inputs.title}
        onChange={inputsHandler}
        placeholder="Название"
        required
      />
      <br />
      <textarea
        name="phone"
        value={inputs.phone}
        onChange={inputsHandler}
        placeholder="телефон"
        required
      />
      <br />
      
      <br />
      <button type="submit">Сохранить</button>
    </form>
  );
}
