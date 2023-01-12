import React from "react";
import About from "./About";

function Header() {
    return (
        <div className="HeaderDiv">
            <h1><span style={{color: '#e05926'}}>Boston</span> Economic Indicator Dashboard</h1>
            <About />
        </div>
    );
}

export default Header;