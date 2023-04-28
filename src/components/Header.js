import React from "react";
import About from "./About";
import OffcanvasNav from "./OffCanvasNav.js"

function Header() {
    return (
        <div className="HeaderDiv">
            <OffcanvasNav />
                <img src={require("../images/BPDALogo.png")} alt="BPDA Logo" id="BPDALogo" />
                <h1>Boston Economic Indicator Dashboard</h1>
            <About />
        </div>
    );
}

export default Header;