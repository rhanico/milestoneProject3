import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function FoodView() {
    // Define state variable 'data' to hold fetched food data
    const [data, setData] = useState([]);

    // Extract the 'urlId' parameter from the route
    const urlId = useParams();

    // URL for fetching food data
    const baseUrl = `http://localhost:8000/api/food/${urlId._id}`;

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {

        const fetchData = async () => {
            try {
         
                const response = await fetch(baseUrl);

                // Check if the response is ok or throw an error
                if (!response.ok) {
                    throw new Error("Failed To Fetch Food Data");
                }

                const fetchFoodData = await response.json();
                setData(fetchFoodData);
            } catch (error) {
                //  Display error on console
                console.log(error);
            }
        };

        //  initiate the fetchData
        fetchData();
    }, [baseUrl]); 

    return (
        <div>
            {/* Render food details */}
            <div className="foodDetails">
                <div className="col-2">
                    <h1>{data?.name}</h1>
                    <p>{data?.description}</p>
                </div>
                <div className="col-1">
                    <img
                        src={`http://localhost:8000/${data?.imageUrl}`}
                        alt={data?.name}
                    />
                    <p>CATEGORY</p>
                    <ul>
                        {/* Map and render food categories */}
                        {data?.category?.length ? (
                            data.category.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))
                        ) : (
                            <li>No categories available</li>
                        )}
                    </ul>
                </div>

                {/* Link to edit the food item */}
                <div>
                    <Link to={`/editFood/${data._id}`}>EDIT</Link>
                </div>
            </div>

            {/* Link to back to the food list */}
            <Link to={"/fridge "}> ← FOOD LIST </Link>
        </div>
    );
}

export default FoodView;
