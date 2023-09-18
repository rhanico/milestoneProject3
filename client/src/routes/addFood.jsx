import React, { useState } from 'react';
import NoImageSelected from "../../public/img"


function AddFood() {

    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");


  return (
    <div>

        <h1> ADD FOOD! </h1>
        <p>Share your Food!</p>

        <form>
            <div className='col-1'>
                <label>Add Photo!</label>
                <img src = {NoImageSelected} 
                     alt='preview img'/>
                <input type='file' accept='image/gif, image/jpeg, image/png'/>
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


            </div>


        </form>




    </div>
  )
}

export default AddFood;