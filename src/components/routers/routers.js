import React from "react";
import HomePage from "../../pages/homepage/homepage";
import { BrowserRouter, Routes , Route } from "react-router-dom";

// routers return the BrowserRouter and pages(viewer)
const routers = () => {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/> 
      </Routes>
    </BrowserRouter>
  
  );

}

export default routers; 
