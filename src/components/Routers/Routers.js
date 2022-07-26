import React from "react";
import HOMEPAGE from "../../pages/homepage/homepage";
import { BrowserRouter, Routes , Route } from "react-router-dom";

// routers return the BrowserRouter and pages(viewer)
const routers = () => {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HOMEPAGE/>}/> 
      </Routes>
    </BrowserRouter>
  
  );

}

export default routers; 