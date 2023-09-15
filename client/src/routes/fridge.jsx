import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Fridge() {
  const baseUrl = "http://localhost:8000/api/food";     // LINK TO BACK END API/DATABASE
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed To Fecth Food Data");
        }
                                                          // FETCHING DATA COMPILE INTO A JSON FILE
        const fetchFoodData = await response.json();
        setData(fetchFoodData);
        setIsLoading(false);                              // WILL SHOW LOADING DURING SLOW CONNECTION
      } catch (error) {
        console.log(error);
        setError("Error Fetching Food, Please Order Again!");
        setIsLoading(false);
      }
    };

    fetchData();                                       // WILL INITIATE THE FETCHING DATA
  }, []);                                              // WILL PREVENT SPAMMING FETCHING DATA

  return (
    <div>
      <h1>Welcome to the Fridge</h1>
      <p> This will showcase different food.</p>

      <h2>FOOD CONTENTS</h2>

      <div className="filters">
        <label>CATEGORIES</label>

        <select>
        <option value="Appertizer">APPERIZER</option>
        <option value="Main Course">MAIN COURSE</option>
        <option value="Dessert">DESSERT</option>
        <option value="Beverage">DRINKS</option>
        </select>
      </div>

      {isLoading ? (                                    // LOADING IF APPLIED OR ELSE ERROR OR ELSE DATA
        <p>Currently Cooking...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="food">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/food/${item._id}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
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
