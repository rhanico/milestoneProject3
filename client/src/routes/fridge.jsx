import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Fridge() {
  const baseUrl = "http://localhost:8000/api/food";       // LINK TO BACK END API/DATABASE
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed To Fecth Data");
        }
                                                         //FETCHING DATA COMPILE INTO A JSON FILE
        const fetchFoodData = await response.json();
        setData(fetchFoodData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();                                        // WILL INITIATE THE FETCHING DATA
  }, []);                                               // WILL PREVENT SPAMMING FETCHING DATA

  return (
    <div>
      <h1>Welcome to the Fridge</h1>
      <p> This will showcase different food.</p>

      <h2>FOOD CONTENTS</h2>

      <ul className="food">
        {data.map((item) => (
          <li key={item._id}>
            <Link to={`/food/${item._id}`}>
              <img
                src={`http://localhost:8000/uploads/${item.thumbnail}`}
                alt={item.title}
              />

              <h3> {item.name} </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fridge;
