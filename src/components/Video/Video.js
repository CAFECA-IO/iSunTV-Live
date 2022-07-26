import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Video = (props) => {
  
  const videoNode = useRef(null);
  const [ player, setPlayer ] = useState(null);

  // useEffect is used to set the video and it's default param
  useEffect(() => {

    if (videoNode.current) {

      const videoPLayer = videojs(videoNode.current, props);
      setPlayer(videoPLayer);
      
      return () => {
      
        if (player !== null) {
          player.dispose();
      
        }
      
      }
    
    }
    
  }, []);

  // return the video element
  return (

    <div data-vjs-player>
      <video ref = { videoNode } className="video-js vjs-default-skin vjs-big-play-centered" ></video>
    </div>
  
  );

}

export default Video;