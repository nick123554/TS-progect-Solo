import { type ChangeEvent, type FormEvent, type JSX } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

// import { UserApi } from "../../../../entities/users/UserApi";
import { UserValidator } from "../../entities/users/model/User.validator";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { UserApi } from "../../entities/users/api/UserApi";
import type { UserStateT } from "../../entities/users/types/UserTypes";

const INITIAL_INPUT_DATA = {
  name: "",
  email: "",
  password: "",
};

type RegFormPropsT = {
  setUser: (user: UserStateT) => void
}

function RegForm({ setUser }:RegFormPropsT): JSX.Element {
  const [inputs, setInputs] = useState(INITIAL_INPUT_DATA);

  const navigate = useNavigate();

  
  const changeHandler = (event:ChangeEvent<HTMLInputElement>): void => {
    setInputs((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const sumbitHandler = async (e:FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const { isValid, error } = UserValidator.validate(inputs);

      if (isValid) {
        const data = await UserApi.register(inputs);

        setUser({ status: "logged", data: data.data.user });

        if (data.statusCode === 201 && data.data.accessToken) {
          setUser({ status: "logged", data: data.data.user });
          // * сохраняем токен на клиенте
          setAccessToken(data.data.accessToken);
          navigate("/");
        } else {
          // 
          return alert(data.error);
        }
      } else {
        console.log("Ошибка из валидатора", error);
        return alert(error);
      }
    } catch (error) {
      console.log("~~~~~~>>", error);
      return alert(error);
    }
  };

  return (
    <Form onSubmit={sumbitHandler}>
      <Form.Group className="mb-3" controlId="formBasicLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={inputs.name}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={inputs.email}
          onChange={changeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={changeHandler}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegForm;
