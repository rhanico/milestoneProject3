import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


function FoodView() {
    const {urlId} = useParams();
    const baseUrl = `http://localhost:8000/api/food/${urlId._id}`;
    const [data, setData] = useState([]);


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
        /*  WILL INITIATE THE FETCHING DATA */
        fetchData();
    }, []);
    return (
        <div>
            
            <Link to ={"/fridge "}>Food</Link>
            <div className="foodDetails">
                <div className="col-1">
                    <img
                        src={`http://localhost:8000/asset/${data.imageUrl}`}
                        alt={data.name}
                     />
                </div>
                <div className="col-2">
                    <h1>{data?.name}</h1>
                    <p>{data?.description}</p>

                    <p>CATEGORY</p>
                    <ul>
                        {data?.category?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>


                </div>
            </div>
        </div>
    )
}

export default FoodView;