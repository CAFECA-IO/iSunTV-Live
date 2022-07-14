import React, { useEffect } from "react";
import './App.scss';
import Routers from '../../components/Routers/Routers';

// app create routers
const APP = () => {

  useEffect(() => {
    document.title = '陽光衛視官方網站';
  });
  
  return (
    <Routers></Routers>
  );

}

export default APP;
