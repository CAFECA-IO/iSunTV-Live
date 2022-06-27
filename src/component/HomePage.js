import React from "react";
import Video from "./Video";
const HomePage = (props) => {
    const play＿details = {
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
    return (
        <Video {...play＿details} />
      );
}

export default HomePage;