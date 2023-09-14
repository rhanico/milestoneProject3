import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {

    return (
        <header>
            <link></link>

            <nav>
                <NavLink>KITCHEN'S DIARY</NavLink>
                <NavLink>FOOD</NavLink>
                <NavLink>SHARE</NavLink>
            </nav>

        </header>
    );
}

export default Header;