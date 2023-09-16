import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
                                                           
                                                                       {/* LINK TO BACK END API/DATABASE */}
function Fridge() {
  const baseUrl = "http://localhost:8000/api/food";     
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCatagory, setSelectedCatagory] = useState( "" );

  useEffect(() => {
    const fetchData = async () => {
      try {

        let url = baseUrl;
        if( selectedCatagory ) {
          url += `?category=${selectedCatagory}`
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed To Fecth Food Data");
        }                            
                                                          {/*  FETCHING DATA COMPILE INTO A JSON FILE */}
        const fetchFoodData = await response.json();
        setData(fetchFoodData);
        setIsLoading(false);                           {/*  WILL SHOW LOADING DURING SLOW CONNECTION */} 
      } catch (error) {
        console.log(error);
        setError("Error Fetching Food, Please Order Again!");
        setIsLoading(false);
      }
    };
                                                          {/*  WILL INITIATE THE FETCHING DATA */}
    fetchData();                                     
  }, [ selectedCatagory ]);                            

  return (
    <div>
      <h1>Welcome to the Fridge</h1>
      <p> This will showcase different food.</p>

      <h2>FOOD CONTENTS</h2>
                                                      {/*  FILTER SEARCH OPTION FOR DATA */}
      <div className="filters">
        <label>CATEGORIES</label>
        <select onChange={(e) => setSelectedCatagory(e.target.value)}>
          <option value="appetizer">APPETIZER</option>
          <option value="main course">MAIN COURSE</option>
          <option value="dessert">DESSERT</option>
          <option value="beverage">DRINKS</option>
        </select>
      </div>

                                                                    {/*  LOADING IF APPLIED OR ELSE ERROR OR ELSE DATA */}
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
                  src={`http://localhost:8000/asset/${item.imageUrl}`}
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
