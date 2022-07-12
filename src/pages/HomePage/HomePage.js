import React, { Fragment } from "react";
// import Video from "../../components/Video";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import Chinasuntv from "../../components/Chinasuntv/chinaSuntv";
import ProgramList from "../../components/Programlist/Programlist";
import Contact from "../../components/Contact/Contact";
import About from "../../components/About/About";
import './HomePage.scss';


const HomePage = (props) => {

    // home page play details
    const PLAY_DETAILS = {
        fill: true,
        fluid: true,
        autoplay: true,
        controls: true,
        preload: "metadata",
        sources: [
          {
            src: "https://stream.chinasuntv.com/680k/mid_video_index.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      };

 // <Video {...PLAY_DETAILS} />
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

export default HomePage;