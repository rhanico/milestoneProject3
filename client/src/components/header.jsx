import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {

    return (
        <header>
            /*  ADD LOGO IMG WITH LINK FUNCTION */
            <link to = "/" className="logo"> 
            </link>

            <nav>
                <NavLink to ="/" >HOME</NavLink>
                <NavLink to ="/kitchen" >KITCHEN'S DIARY</NavLink>
                <NavLink to ="/fridge" >FRIDGE</NavLink>
                <NavLink to ="/share" >SHARE</NavLink>
            </nav>

        </header>
    );
}

export default Header;