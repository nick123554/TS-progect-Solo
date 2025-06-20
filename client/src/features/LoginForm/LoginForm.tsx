import { type ChangeEvent, type FormEvent, type JSX } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

import { setAccessToken } from "../../shared/lib/axiosInstance";
import { UserApi } from "../../entities/users/api/UserApi";
import type { UserStateT } from "../../entities/users/types/UserTypes";

const INITIAL_INPUT_DATA = {
  email: "",
  password: "",
};

type LogFormPropsT = {
  setUser: (user: UserStateT)=> void
}

function LogForm({ setUser }: LogFormPropsT): JSX.Element {
  const [inputs, setInputs] = useState(INITIAL_INPUT_DATA);

  const navigate = useNavigate();

  const changeHandler = (event:ChangeEvent<HTMLInputElement>): void => {
    setInputs((pre) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const sumbitHandler = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    try {
      const data = await UserApi.login(inputs);

      setUser({ status: "logged", data: data.data.user });

      console.log("LogForm data:", data);
      if (data.statusCode === 200 && data.data.accessToken) {
        setUser({ status: "logged", data: data.data.user });
        setAccessToken(data.data.accessToken);
        navigate("/");
      } else {
       
        return alert(data.error);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      return alert(error);
    }
  };

  return (
    <Form onSubmit={sumbitHandler}>
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

export default LogForm;
