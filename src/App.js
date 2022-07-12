import React from "react";
import './App.scss';
import Routers from './components/Routers/Routers';

function App() {
  // const linkStyle = {
  //   textDecoration: "none",
  //   color: 'white',
  //   padding: '0 20px',
  //   backgroundColor: "black"
  // };
  return (
    <Routers></Routers>
  );
}
export default App;
// <Route exact index element={<Home />} />
// <Route exact path="/about" element={<About />} />