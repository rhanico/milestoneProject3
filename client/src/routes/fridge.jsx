import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* LINK TO BACK END API/DATABASE */
function Fridge() {
  const baseUrl = "http://localhost:8000/api/food";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;

        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed To Fecth Food Data");
        }
        /*  FETCHING DATA COMPILE INTO A JSON FILE */
        const fetchFoodData = await response.json();
        setData(fetchFoodData);
        setIsLoading(false);                              /*  WILL SHOW LOADING DURING SLOW CONNECTION */
      } catch (error) {
        console.log(error);
        setError("Error Fetching Food, Please Order Again!");
        setIsLoading(false);
        setData([]);
      }
    };
    /*  WILL INITIATE THE FETCHING DATA */
    fetchData();
  }, [ selectedCategory ]);
  /*  FILTER SEARCH OPTION FOR DATA 
                                                            LOADING IF APPLIED OR ELSE ERROR OR ELSE DATA */
  return (
    <div>
      <h1>Welcome to the Fridge</h1>
      <p> This will showcase different food.</p>

      <h2>FOOD CONTENTS</h2>

      <div className="filters">
        <label>CATEGORIES</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">ALL</option>
          <option value="appetizer">APPETIZER</option>
          <option value="main course">MAIN COURSE</option>
          <option value="dessert">DESSERT</option>
          <option value="beverage">DRINKS</option>
        </select>
      </div>

      {isLoading ? (
        <p>Currently Cooking...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="food">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/food/${item._id}`}>
                <img
                  src={`http://localhost:8000/${item.imageUrl}`}

                  alt={item.name}
                />

                <h3> {item.name} </h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Fridge;
