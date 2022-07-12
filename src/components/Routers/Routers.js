import React from "react";
import HomePage from "../../pages/HomePage/HomePage";
import { BrowserRouter, Routes , Route, NavLink} from "react-router-dom";

const Routers = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/> 
      </Routes>
    </BrowserRouter>
  );
};

export default Routers; 