import React, {useState} from 'react';
import Nav from "../component/NavBar";
import Footer from "../component/Footer";
import SimpleSidebar from "../component/SideBar";

const Main =(props)=> {
    return (
        <>
            <Nav/>
            {props.children}
            <Footer/>
        </>
    );
}

export default Main;