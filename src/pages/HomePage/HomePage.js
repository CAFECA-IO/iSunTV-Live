import React, { Fragment } from "react";
import Header from '../../components/Header/Header';
import FOOTER from "../../components/Footer/Footer";
import Chinasuntv from "../../components/Chinasuntv/Chinasuntv";
import ProgramList from "../../components/Programlist/Programlist";
import Contact from "../../components/Contact/Contact";
import About from "../../components/About/About";
import './HomePage.scss';

class HomePage extends React.Component {

  // A constructor is used to inherit the value (prop)  from upper class
  /**
   * inherit the value (prop)  from upper class 
   * @param props means props from the upper class
   */  
  constructor(props) {

    super(props);
        
  }

  render() {
    // put header , chinasuntv, programlist, about, contact, footer in the homepage
    return (

      <Fragment>
        <Header></Header>
        <div className = "container">
          <Chinasuntv></Chinasuntv>
          <ProgramList></ProgramList>
          <About></About>
          <Contact></Contact>
          <FOOTER></FOOTER>
        </div>
      </Fragment>
    
    );

  } 

}

export default HomePage;