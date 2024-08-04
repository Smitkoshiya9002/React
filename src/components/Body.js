import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Body = () => {
    console.log("hello");
    return (
        <div className="flex">
            <SideBar />
            <Outlet />
            {console.log("hello")}
        </div>
    );
};

export default Body;
