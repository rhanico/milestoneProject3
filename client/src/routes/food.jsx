import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router-dom";


function FoodView() {
    const baseUrl = "http://localhost:8000/api/food";
    const [data, setData] = useState([]);
    const urlId = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch( `${basuUrl} ${urlId._id}` );
    
            if (!response.ok) {
              throw new Error("Failed To Fecth Food Data");
            }
                                     
          } catch (error) {
            console.log(error);
            setError("Error Fetching Food, Please Order Again!");
          }
        };
                                                                 /*  WILL INITIATE THE FETCHING DATA */
        fetchData();
      }, []);
  return (
    <div>

        <pre>{JSON.stringify( data,null, 2 )}</pre>

    </div>
  )
}

export default FoodView