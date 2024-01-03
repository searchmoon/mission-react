import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import styled from "styled-components";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <MealsStyle>
      {loadedMeals.map((meal) => (
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
