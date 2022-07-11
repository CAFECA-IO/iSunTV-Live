import React from "react";
import HomePage from "./HomePage";
import PlayList from "./PlayList";
import { BrowserRouter, Routes , Route, NavLink} from "react-router-dom";

const Routers = (props) => {
  return (
    <BrowserRouter>
      <div className="nav">
        <NavLink to="/" >首頁</NavLink>
        <NavLink to="/playlist" >節目表</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<HomePage/>}/> 
        <Route path="/playlist" element={<PlayList/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;