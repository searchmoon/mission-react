import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import styled from "styled-components";
const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  const handleAddMealToCart = () => {
    cartCtx.addItem(meal);
  };
  return (
    <MealItemStyle className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </MealItemStyle>
  );
};

const MealItemStyle = styled.li`
  background-color: #1d1a16;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);

  article {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
      width: 100%;
      height: 20rem;
      object-fit: cover;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0.75rem 0;
    }

    .meal-item-description {
      margin: 1rem;
    }

    .meal-item-price {
      display: inline-block;
      background-color: #312c1d;
      color: #ffc404;
      font-size: 0.9rem;
      font-weight: bold;
      padding: 0.5rem 2rem;
      margin: 0;
      border-radius: 4px;
    }

    .meal-item-actions {
      margin-bottom: 1.5rem;
    }
  }
`;

export default MealItem;
