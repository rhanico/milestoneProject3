import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


function FoodView() {
    const [data, setData] = useState([]);
    const urlId = useParams();
    const baseUrl = `http://localhost:8000/api/food/${urlId._id}`;
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Failed To Fecth Food Data");
                }

                const fetchFoodData = await response.json();
                setData(fetchFoodData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div className="foodDetails">
                <div className="col-1">

                    <p>CATEGORY</p>        {/** NEED TO FIX CATEGORY VALUE NOT SHOWING */}
                    <ul>
                        {data?.category?.length ? (
                            data.category.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))
                        ) : (
                            <li>No categories available</li>
                        )}
                    </ul>

                    <img
                        src={`http://localhost:8000/${data?.imageUrl}`}
                        alt={data?.name}/>
                    <Link to ={`/editFood/${data._id}`}>EDIT</Link>
                </div>
                <div className="col-2">
                    <h1>{data?.name}</h1>
                    <p>{data?.description}</p>
                </div>
            </div>
            <Link to ={"/fridge "}> FOOD LIST </Link>
        </div>
    )
}

export default FoodView;