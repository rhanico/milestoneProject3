import React from 'react';
import homeImage from "../img/homebackground.jpg";

function Home() {
  return (

    <div className='home-con'>
        <h1> WELCOME TO THE "KITCHEN"! </h1>
        <p> A food sharing web for Foodies!</p>
        <img src={homeImage} alt='home background img' className='homeImg'></img>
    </div>
  )
}

export default Home;