import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NoImageSelected from '../../img/no-image.jpg';

function EditFood() {
    // Get the _id parameter from the URL
    const { _id } = useParams();
    // API endpoint URL
    const baseUrl = `http://localhost:8000/api/food/${_id}`;

    // Variables for form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Fetching data for the food item when the component mounts
    useEffect(() => {
        async function fetchFoodData() {
            try {
                const response = await fetch(baseUrl);
                if (response.ok) {
                    const foodData = await response.json();
                    // Populate the form fields with data
                    setName(foodData.name);
                    setDescription(foodData.description);
                    setCategory(foodData.category.join(', '));
                } else {
                    console.log('Failed to fetch food data');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchFoodData();
    }, [baseUrl]);

    // Update food data when the form is submitted
    const updateFood = async (e) => {
        e.preventDefault();

        // Updated data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);

        try {
            const response = await fetch(baseUrl, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                console.log('Failed to update data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Handle category input changes
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    // Delete Function
    const deleteFood = async () => {
        try {
            const response = await fetch(baseUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Food deleted successfully');
            } else {
                console.log('Failed to delete food');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>EDIT FOOD!</h1>

            {isSubmitted ? (
                <p>FOOD SUBMITTED!</p>
            ) : (
                <div>
                    <form className="foodDetails" onSubmit={updateFood}>
                        {/* Form fields and input elements */}
                        <div className="col-1">
                            <label>Add Photo!</label>
                            <img src={NoImageSelected} alt="preview img" />
                            <input type="file" accept="image/gif, image/jpeg, image/png" />
                        </div>

                        <div className="col-2">
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>DESCRIPTION</label>
                                <textarea
                                    rows="4"
                                    cols="50"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>CATEGORY</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={handleCategoryChange}
                                />
                            </div>

                            <input type="submit" value="Update Food" />
                            <button onClick={deleteFood}>Delete Food</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditFood;
