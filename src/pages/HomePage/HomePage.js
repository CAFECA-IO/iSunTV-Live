import React, { Fragment } from "react";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import Chinasuntv from "../../components/chinasuntv/chinasuntv";
import ProgramList from "../../components/programlist/programlist";
import Contact from "../../components/contact/contact";
import About from "../../components/about/about";
import './homepage.scss';

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
          <Footer></Footer>
        </div>
      </Fragment>
    
    );

  } 

}

export default HomePage;