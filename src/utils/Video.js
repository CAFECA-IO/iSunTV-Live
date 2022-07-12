import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Video = (props) => {
  
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {

    if (videoNode.current) {
      const _player = videojs(videoNode.current, props);
      setPlayer(_player);
      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
    
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js vjs-default-skin" width="640px" height="267px"></video>
    </div>
  );
};

export default Video;