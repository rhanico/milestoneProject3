import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/donutlogo.png";


function Header() {

    return (
        <header>
            <Link to = "/" className="logo"> 
            <img src= {logo} alt="logo"></img>
            <NavLink to ="/" >HOME</NavLink>
            </Link>
            

            <nav>
                <NavLink to ="/fridge" >FRIDGE</NavLink>
                <NavLink to ="/share" >SHARE</NavLink>
            </nav>

        </header>
    );
}

export default Header;