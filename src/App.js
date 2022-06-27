import React from "react";
import { BrowserRouter, Routes , Route, NavLink} from "react-router-dom";
import HomePage from "./component/HomePage";
import PlayList from "./component/PlayList";
import './App.css';
import './style.css';

function App() {
  const linkStyle = {
    textDecoration: "none",
    color: 'white',
    padding: '0 20px',
    backgroundColor: "black"
  };
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
}
export default App;
// <Route exact index element={<Home />} />
// <Route exact path="/about" element={<About />} />