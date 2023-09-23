import React, { useState } from 'react';
import NoImageSelected from "../../img/no-image.jpg"

function AddFood() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null); 
    const [isSubmitted, setIsSubmitted] = useState(false);

    const addFood = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        if (image) {
            formData.append("imageUrl", image);
        }

        try {
            const response = await fetch("http://localhost:8000/api/food", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setName("");
                setDescription("");
                setCategory("");
                setImage(null);
                setIsSubmitted(true);
            } else {
                console.log("Failed to add data");

                const responseData = await response.text();
                console.log("Response data:", responseData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value.split(",").map((category) => category.trim()));
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        console.log("Selected image:", selectedImage);
        setImage(selectedImage);
    }


    return (
        <div>
            <h1>SHARE YOUR FOOD!</h1>

            {isSubmitted ? (
                <p>FOOD SUBMITTED!</p>
            ) : (
                <form className='foodDetails' onSubmit={addFood} encType="multipart/form-data">

                    <div className='col-1'>
                        <div>
                            <label>Add Photo!</label>
                        </div>
                        <img src={image ? URL.createObjectURL(image) : NoImageSelected} alt='preview img' />
                        <input type='file' accept='image/gif, image/jpeg, image/png' onChange={handleImageChange} />
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
                            <label htmlFor="category">CATEGORY</label>
                            <select
                                id="category"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="main_course">Main Course</option>
                                <option value="appetizer">Appetizer</option>
                                <option value="dessert">Dessert</option>
                                <option value="beverage">Beverage</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <input type='submit' />
                    </div>
                </form>
            )}
        </div>
    )
}

export default AddFood;
