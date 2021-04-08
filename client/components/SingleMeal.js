//axioscall for single meal
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import NavBar from "./NavBar";

const SingleMeal = (props) => {

  console.log("props in single meal is ",props);

  const [meal, setMeal] = useState(null);

  useEffect(async () => {
    const { meals } = (
      await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata`)
    ).data;
    setMeal(meals[0]);
  }, []);

  if (!meal){
    return null;
  }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
        );
      } else {
        // Stop if there are no more ingredients
        break;
      }
    }

    let youTubeId = meal.strYoutube.slice(-11);
    let youTubeURL = "https://www.youtube.com/embed/"+youTubeId;
    console.log(youTubeURL);


    return (
      <div className="dinner-box">
        <NavBar />
      <center>
        <p>This should be the single meal page!</p>

      <h1><strong>{meal.strMeal}</strong></h1>
      <h2>Ingredients</h2>
      <ul>
      {
        ingredients.map((item, idx) =>{
          return (
          <li key={idx}>
            {item}
          </li>
          )
        })
      }
      </ul>
      {
			meal.strYoutube ?
		<div className="row">
			<h3>Video Recipe</h3>
			<div className="videoWrapper">
				<iframe width="420" height="315"
				src={youTubeURL}>
				</iframe>
			</div>
		</div>	: ''
		}
      </center>
      </div>

     );

}

export default SingleMeal;