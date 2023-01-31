import React from "react";
import About from "./About";
import OffcanvasNav from "./OffCanvasNav.js"

function Header() {
    return (
        <div className="HeaderDiv">
            <OffcanvasNav />
            {/* <img src={require("../images/BPDALogo.png")} alt="BPDA Logo" id="BPDALogo" /> */}
            {/* <img src={require("../images/BPDALogoFull.png")} alt="BPDA Logo" id="BPDALogo" /> */}
            <h1><span style={{color: '#FFF'}}>Boston</span> Economic Indicator Dashboard</h1>
            {/* <h1 className="align-middle">Boston Economic Indicator Dashboard</h1> */}
            <About />
        </div>
    );
}

export default Header;