import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import SingleMeal from "./SingleMeal";

const ChickenMeals = (props) => {

  const [meal, setMeal] = useState(null);
  console.log(meal)

      useEffect(async () => {
        const { meals } = (
          await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`)
        ).data;
        setMeal(meals);
      }, []);

      if (!meal){
        return null;
      }

    return (
      <div className="dinner-box">
        <NavBar />
      <center>
      <h2>Meals you can make with Chicken</h2>
      <ul>
      {

        meal.map((dishObj, idx) =>{
          return (
          <li key={idx}>
            <Link to={`/singlemeal/${dishObj}`}>{dishObj.strMeal}</Link>
            <div className="gap-10"/>
            <img src = {dishObj.strMealThumb} className="img-single-meal" />
            <div className="gap-10"/>
          </li>
          )
        })
      }
      </ul>
      </center>
      </div>

     );

}

export default ChickenMeals;