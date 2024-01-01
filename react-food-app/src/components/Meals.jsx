import React, { useEffect, useState } from "react";
import axios from "axios";
import MealItem from "./MealItem";

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
    <ul id="meals">
      {mealData.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
