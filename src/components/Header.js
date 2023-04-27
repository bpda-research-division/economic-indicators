import React from "react";
import About from "./About";
import OffcanvasNav from "./OffCanvasNav.js"

function Header() {
    return (
        <div className="HeaderDiv">
            <OffcanvasNav />
            <h1><span style={{color: '#FFF'}}>Boston</span> Economic Indicator Dashboard</h1>
            <About />
        </div>
    );
}

export default Header;