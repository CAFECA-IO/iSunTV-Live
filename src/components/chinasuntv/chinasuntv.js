/* eslint-disable no-extra-boolean-cast */
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Video from '../video/video';
import {transferToTime} from '../../utils/time_operator';
import './chinasuntv.scss';

class Chinasuntv extends Component {
  // A constructor is used to inherit the value (prop)  from upper class
  /**
   * @param props means value from the upper class
   * set fade in classname and data which is needed to be fetch to null
   */
  constructor(props) {
    super(props);
    this.state = {
      fade: 'in',
      data: null,
    };

    this.updateState = this.updateState.bind(this);
  }

  // A function
  /**
   * inherit the value (prop)  from upper class
   * @param props means props from the upper class
   */
  updateState(data) {
    // Changing state
    const playlist = data.payload;
    let playlistArray = [];

    if (!('payload' in data)) {
      // set the normalized data to state: data, => no data
      playlistArray.push({pre: '', time: '', tag: ''});
      playlistArray.push({now: '', time: '', tag: '目前尚無資料'});
      playlistArray.push({next: '', time: '', tag: ''});
    } else {
      // get the closest time
      let closetTime = playlist.map(d => Math.abs(new Date() - new Date(d.PlayTime).getTime()));
      let idx = closetTime.indexOf(Math.min(...closetTime));

      // update the data as the normalized data
      if (idx + 1 > playlist.length - 1) {
        playlistArray.push({
          pre: playlist[idx - 2].prgName,
          time: transferToTime(playlist[idx - 2].PlayTime),
          tag: playlist[idx - 2].prgColumn,
        });
        playlistArray.push({
          now: playlist[idx - 1].prgName,
          time: transferToTime(playlist[idx - 1].PlayTime),
          tag: playlist[idx - 1].prgColumn,
        });
        playlistArray.push({
          next: playlist[idx].prgName,
          time: transferToTime(playlist[idx].PlayTime),
          tag: playlist[idx].prgColumn,
        });
      } else {
        playlistArray.push({
          pre: playlist[idx - 1].prgName,
          time: transferToTime(playlist[idx - 1].PlayTime),
          tag: playlist[idx - 1].prgColumn,
        });
        playlistArray.push({
          now: playlist[idx].prgName,
          time: transferToTime(playlist[idx].PlayTime),
          tag: playlist[idx].prgColumn,
        });
        playlistArray.push({
          next: playlist[idx + 1].prgName,
          time: transferToTime(playlist[idx + 1].PlayTime),
          tag: playlist[idx + 1].prgColumn,
        });
      }
    }
    // set the normalized data to state: data
    this.setState({data: playlistArray});
  }

  componentDidMount() {
    // fetch the content from programlist api
    fetch('/api/v1/chinasun/programlist')
      .then(response => response.json())
      .then(data => this.updateState(data));
  }

  render() {
    // get time now and put the data in the list
    const fade = this.state.fade;
    const data = this.state.data;

    const playDetails = {
      fill: true,
      fluid: true,
      autoplay: false,
      controls: true,
      preload: 'metadata',
      sources: [
        {
          src: 'https://stream.chinasuntv.com/680k/mid_video_index.m3u8',
          type: 'application/x-mpegURL',
        },
      ],
    };

    return (
      <div className="c_chinaSuntv">
        <Video {...playDetails} />
        <div className="paddingBottom" />
        <div className="nowPlaying">
          <div>Now Playing</div>
          <div className={fade}>{!!data ? data[1].now : ''}</div>
        </div>
        <div className="paddingBottom" />
        <div className="preNext">
          <div>
            <span className={fade}>{!!data ? data[0].time : ''}</span>
            <span className={fade}>{!!data ? data[1].time : ''}</span>
            <span className={fade}>{!!data ? data[2].time : ''}</span>
          </div>
          <div>
            <div>
              <div />
            </div>
            <div>
              <div className="center" />
            </div>
            <div>
              <div />
            </div>
          </div>
          <div className="programTag">
            <div>
              <span className={fade}>{!!data ? data[0].tag : ''}</span>
            </div>
            <div className="center">
              <span className={fade}>{!!data ? data[1].tag : ''}</span>
            </div>
            <div>
              <span className={fade}>{!!data ? data[2].tag : ''}</span>
            </div>
          </div>
          <div className="programName">
            <span className={fade}>{!!data ? data[0].pre : ''}</span>
            <span className={`center ${fade}`}>{!!data ? data[1].now : ''}</span>
            <span className={fade}>{!!data ? data[2].next : ''}</span>
          </div>
        </div>
      </div>
    );
  }
}

Chinasuntv.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Chinasuntv;
