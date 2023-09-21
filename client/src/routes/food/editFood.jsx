import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import NoImageSelected from "../../img/no-image.jpg"


function EditFood() {

    const navigate = useNavigate();
    const urlId = useParams();
    const baseUrl = `http://localhost:8000/api/food/${urlId._id}`

    const [foodId, setFoodId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [category, setCategory] = useState([]);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error(" FAILED TO FECTH DATA .");
            }
            const data = await response.json();
            setFoodId(data._id);
            setName(data.name);
            setDescription(data.description);
            setImageUrl(data.imageUrl);
            setCategory(data.category);

        }
        catch (error) {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    const addFood = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("foodId", foodId);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);

        if (imageUrl) {
            formData.append("imageUrl", imageUrl);

        }

        try {
            const response = await fetch("http://localhost:8000/api/food", {
                method: "PUT",
                body: FormData,
            });

            if (response.ok) {
                setName("");

                submitted(true)
            } else {
                console.log("Failed to add data");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value.split(",").map((category) => category.trim()));
    }

    const removeFood = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8000/api/food/" + foodId,
                {
                    method: "DELETE"
                }
            )
            if (response.ok) {
                navigate("/food");
                console.log("Remove Food!");
            }

        }
        catch (error) {
            console.error(error);
        }
    }



    return (
        <div>

            <h1> EDIT </h1>

            <button onClick={removeFood} className="delete">
                REMOVE FOOD
            </button>

            {submitted ? (
                <p> FOOD SUBMITED! </p>
            ) : (
                <form className='foodDetails' onSubmit={addFood}>
                    <div className='col-1'>
                        <lable>Add Photo!</lable>

                        {image ? (
                            <img src={`${image}`}
                                alt="preview image" />
                        ) : (
                            <img src={`http://localhost:8000/asset/${imageUrl}`}
                                alt='preview img' />
                        )}
                        <input type='file' accept='image/gif, image/jpeg, image/png' onChange={(e)}/>
                    </div>

                    <div className='col-2'>
                        <div>
                            <lable>Name</lable>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <lable>DESCRIPTION</lable>
                            <textarea
                                rows="4"
                                cols="50"
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <lable>CATEGORY</lable>
                            <input
                                type='text'
                                value={category}
                                onChange={handleCategoryChange}
                            />
                        </div>

                        <input type='submit' />
                    </div>
                </form>
            )}

        </div>
    )
}

export default EditFood;