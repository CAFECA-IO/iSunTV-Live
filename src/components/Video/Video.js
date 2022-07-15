import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Video = (props) => {
  
  const VIDEO_NODE = useRef(null);
  const [ PLAYER, SET_PLAYER ] = useState(null);

  // useEffect is used to set the video and it's default param
  useEffect(() => {

    if (VIDEO_NODE.current) {

      const VIDEO_PLAYER = videojs(VIDEO_NODE.current, props);
      SET_PLAYER(VIDEO_PLAYER);
      
      return () => {
      
        if (PLAYER !== null) {
          PLAYER.dispose();
      
        }
      
      }
    
    }
    
  }, []);

  // return the video element
  return (

    <div data-vjs-player>
      <video ref={VIDEO_NODE} className="video-js vjs-default-skin vjs-big-play-centered" ></video>
    </div>
  
  );

}

export default Video;