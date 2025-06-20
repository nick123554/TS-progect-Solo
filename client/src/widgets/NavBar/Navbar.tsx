import { type JSX } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router";
import Button from "react-bootstrap/Button";
import type { UserStateT } from "../../entities/users/types/UserTypes";

type NavBarPropsT = {
  logautHendler: () => void;
  user: UserStateT;
};

export default function NavBar({ logautHendler, user }: NavBarPropsT): JSX.Element {
  console.log(user);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="gap-3">
          <NavLink to={"/"}>Главная</NavLink>
          <NavLink to={"/add"}>Добавить компанию</NavLink>

          <NavLink to={"/products"}>Мои Компании</NavLink>
          {user?.status === "logged" ?
          (<NavLink to={"/personal"}>Личный Кабинет</NavLink>) : <></>}

          {user?.status === "logged" ? (
            <Button onClick={logautHendler}>Выход</Button>
          ) : (
            <>
              <NavLink to={"/signup"}>Регистрация</NavLink>
              <NavLink to={"/login"}>Вход</NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
