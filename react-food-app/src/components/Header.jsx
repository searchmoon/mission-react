import { useContext, useEffect, useState } from "react";
import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import styled from "styled-components";
import UserProgressContext from "../store/UserProgressContext";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalOfItems, item) => {
    return (totalOfItems += item.quantity);
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <HeaderStyle id="main-header">
      <div id="title">
        <img src={logoImg} alt="a restaurant" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart {totalCartItems}
        </Button>
      </nav>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 10%;

  #title {
    display: flex;
    gap: 1rem;
    align-items: center;

    img {
      width: 4rem;
      height: 4rem;
      object-fit: contain;
      border-radius: 50%;
      border: 2px solid #ffc404;
    }
  }

  button {
    font-size: 1.5rem;
    font-family: "Lato", sans-serif;
  }
`;
export default Header;
