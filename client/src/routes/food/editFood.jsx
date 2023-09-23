import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import NoImageSelected from "../../img/no-image.jpg";

function EditFood() {

    const urlId = useParams();
    const baseUrl = `http://localhost:8000/api/food/${urlId._id}`;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const addFood = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);

        try {
            const response = await fetch("http://localhost:8000/api/food", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setName("");
                setIsSubmitted(true);
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

    return (
        <div>
            <h1>EDIT FOOD!</h1>

            {isSubmitted ? (
                <p>FOOD SUBMITTED!</p>
            ) : (
                <form className='foodDetails' onSubmit={addFood}>
                    <div className='col-1'>
                        <label>Add Photo!</label>
                        <img src={NoImageSelected} alt='preview img' />
                        <input type='file' accept='image/gif, image/jpeg, image/png' />
                    </div>

                    <div className='col-2'>
                        <div>
                            <label>Name</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>DESCRIPTION</label>
                            <textarea
                                rows="4"
                                cols="50"
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>CATEGORY</label>
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
