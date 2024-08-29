import React from "react";
import About from "./About";
import OffcanvasNav from "./OffCanvasNav.js"

function Header() {
    return (
        <div className="HeaderDiv">
            <OffcanvasNav />
                <h1>Boston Economic Indicators Dashboard</h1>
                
                {/* <h1>Boston Economic Indicators Dashboard</h1> */}
            <About />
            <img src={require("../images/Planning Department-CoB_Wordmark-WHITE.png")} alt="BPDA Logo" id="BPDALogo" />
        </div>
    );
}

export default Header;