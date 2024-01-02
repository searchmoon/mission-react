import React, { useEffect, useState } from "react";
import axios from "axios";
import MealItem from "./MealItem";
import styled from "styled-components";

const Meals = () => {
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const axiosMeals = async () => {
      try {
        const response = await axios("http://localhost:3000/meals");
        setMealData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    axiosMeals();
  }, []);

  return (
    <MealsStyle>
      {mealData.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </MealsStyle>
  );
};

const MealsStyle = styled.ul`
  width: 90%;
  max-width: 70rem;
  list-style: none;
  margin: 2rem auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
`;

export default Meals;
