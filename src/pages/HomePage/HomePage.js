import React, { Fragment } from "react";
import Header from '../../components/Header/Header';
import FOOTER from "../../components/Footer/Footer";
import Chinasuntv from "../../components/Chinasuntv/chinaSuntv";
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

  // componentDidMount() {

  //   fetch('http://localhost:3000/api/v1/chinasun/programlist')
  //     .then(response => response.json())
  //     .then(data => {this.updateState(data)});
  
  // }

  render() {
    // put header , chinasuntv, programlist, about, contact, footer in the homepage
    return (

      <Fragment>
        <Header></Header>
        <div className = "container">
          <Chinasuntv data = ""></Chinasuntv>
          <ProgramList data = ""></ProgramList>
          <About></About>
          <Contact></Contact>
          <FOOTER></FOOTER>
        </div>
      </Fragment>
    
    );

  } 

}

export default HomePage;