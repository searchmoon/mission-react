import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";

const Header = () => {
  const [cartItemLength, setCartItemLength] = useState(0);
  const cartCtx = useContext(CartContext);
  console.log(cartCtx.items);

  const totalCartItems = cartCtx.items.reduce((totalOfItems, item) => {
    return (totalOfItems += item.quantity);
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="a restaurant" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly>Cart {totalCartItems}</Button>
      </nav>
    </header>
  );
};

export default Header;
