import React from "react";
import HOMEPAGE from "../../pages/HomePage/HomePage";
import { BrowserRouter, Routes , Route, NavLink} from "react-router-dom";

// routers return the BrowserRouter and pages(viewer)
const ROUTERS = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HOMEPAGE/>}/> 
      </Routes>
    </BrowserRouter>
  );
};

export default ROUTERS; 