import React, { useEffect } from "react";
import './App.scss';
import Routers from '../../components/Routers/Routers';


const APP = () => {

  // use useEffect and change the document title
  useEffect(() => {

    document.title = '陽光衛視官方網站';
  
  });

  // app create routers
  return (
  
    <Routers></Routers>
  
  );

}

export default APP;
