/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import PropTypes from 'prop-types';
import Video from '../Video/Video';
import { transferToTime } from '../../utils/TimeOperator';
import './Chinasuntv.scss';

class Chinasuntv extends React.Component {

    // A constructor is used to inherit the value (prop)  from upper class
    /**
     * @param props means value from the upper class
     * set fade in classname and data which is needed to be fetch to null
     */  
    constructor(props) {

        super(props);
        this.state = {
            fade: 'in',
            data: null
        };

        this.updateState = this.updateState.bind(this) 
        
    }

    // A function
    /**
     * inherit the value (prop)  from upper class 
     * @param props means props from the upper class
     */  
    updateState(data) { 

        // Changing state 
        const playlist = data.payload;
        let playlist_array = [];
        // get the closest time
        var closet_time = playlist.map(d => Math.abs(new Date() - new Date(d.PlayTime).getTime()));
        var idx = closet_time.indexOf(Math.min(...closet_time));

        // update the data as the normalized data
        if ( ( idx + 1 ) > ( playlist.length - 1 )){

            playlist_array.push({ pre: playlist[idx-2].prgName , time: transferToTime( playlist[idx - 2].PlayTime ) , tag: playlist[idx - 2].prgColumn });
            playlist_array.push({ now: playlist[idx-1].prgName , time: transferToTime( playlist[idx - 1].PlayTime ) , tag: playlist[idx - 1].prgColumn });
            playlist_array.push({ next: playlist[idx].prgName , time: transferToTime( playlist[idx].PlayTime ) , tag: playlist[idx].prgColumn });
        
        } else {
        
            playlist_array.push({ pre: playlist[idx-1].prgName , time: transferToTime( playlist[idx - 1].PlayTime ) , tag: playlist[idx - 1].prgColumn });
            playlist_array.push({ now: playlist[idx].prgName , time: transferToTime( playlist[idx].PlayTime ) , tag: playlist[idx].prgColumn });
            playlist_array.push({ next: playlist[idx+1].prgName , time: transferToTime( playlist[idx + 1].PlayTime) , tag: playlist[idx + 1].prgColumn });            
        
        }

        // set the normalized data to state: data
        this.setState({ data : playlist_array }); 
    
    }
    
    componentDidMount() {
        // fetch the content from programlist api
        fetch('http://localhost:3000/api/v1/chinasun/programlist')
            .then(response => response.json())
            .then(data => this.updateState(data));
    }

    render() {
        // get time now and put the data in the list 
        const FADE  = this.state.fade;
        const DATA = this.state.data;

        const PLAY_DETAILS = {
            fill: true,
            fluid: true,
            autoplay: false,
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

            <div className="c_chinaSuntv">
                <Video {...PLAY_DETAILS} />
                <div className="paddingBottom" />
                <div className="nowPlaying">
                    <div>Now Playing</div>
                    <div className={FADE}>{ !!DATA ? DATA[1].now : ''}</div>
                </div>
                <div className="paddingBottom" />
                 <div className="preNext">
                    <div>
                        <span className={FADE}>{ !!DATA ? DATA[0].time : ''}</span>
                        <span className={FADE}>{ !!DATA ? DATA[1].time : ''}</span>
                        <span className={FADE}>{ !!DATA ? DATA[2].time : ''}</span>
                    </div>
                    <div>
                        <div><div /></div>
                        <div><div className="center" /></div>
                        <div><div /></div>
                    </div>
                    <div className="programTag">
                        <div><span className={FADE}>{ !!DATA ? DATA[0].tag : ''}</span></div>
                        <div className="center"><span className={FADE}>{ !!DATA ? DATA[1].tag : ''}</span></div>
                        <div><span className={FADE}>{ !!DATA ? DATA[2].tag : ''}</span></div>
                    </div>
                    <div className="programName">
                        <span className={FADE}>{ !!DATA ? DATA[0].pre : ''}</span>
                        <span className={`center ${FADE}`}>{ !!DATA ? DATA[1].now : ''}</span>
                        <span className={FADE}>{ !!DATA ? DATA[2].next : ''}</span>
                    </div>
                </div>
            </div>

        );
    
    }

}

Chinasuntv.propTypes = {

    data: PropTypes.object.isRequired

};

export default Chinasuntv;
