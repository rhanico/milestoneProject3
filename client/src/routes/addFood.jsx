import React, { useState } from 'react';
import NoImageSelected from "../img/no-image.jpg"


function AddFood() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [category, setCategory] = useState([]);
    const [submitted, setSubmitted] = useState("");





    const addFood = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append ("name", name);
        formData.append ("description", description);
        formData.append ("category", category);
      

        try {
            const response = await fetch("http://localhost:8000/api/food", {
                method: "POST",
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
        setCategory( e.target.value.split(",").map((category) => category.trim()));
    }


    return (
        <div>

            <h1> ADD FOOD! </h1>
            <p>Share your Food!</p>

            {submitted ? (
                <p> FOOD SUBMITED! </p>
            ) : (
                <form className='foodDetails' onSubmit={addFood}>
                    <div className='col-1'>
                        <lable>Add Photo!</lable>
                        <img src={NoImageSelected}
                            alt='preview img' />
                        <input type='file' accept='image/gif, image/jpeg, image/png' />
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
                                onChange={ handleCategoryChange }
                            />
                        </div>

                        <input type='submit' />
                    </div>
                </form>
            )}

        </div>
    )
}

export default AddFood;