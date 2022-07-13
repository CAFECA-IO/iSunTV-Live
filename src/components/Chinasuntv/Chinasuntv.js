import React from 'react';
import PropTypes from 'prop-types';
import Video from '../Video/Video';
import './Chinasuntv.scss';

class Chinasuntv extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fade: 'in',
            data: null
        };

        this.updateState = this.updateState.bind(this) 
        
    }

    transferToTime(datetime){

        let time = new Date(datetime);
        let hour;
        let min;

        if(time.getHours() < 10){
            hour = '0' + time.getHours();
        } else {
            hour = time.getHours();
        }
        
        if(time.getMinutes() < 10){
            min = '0' + time.getMinutes();
        } else {
            min = time.getMinutes();
        }

        return hour + ":" + min;
    }

    updateState(data){ 
        // Changing state 
        const playlist = data.payload;
        const now = Date.now();
        let playlist_array = [];
        // get the closest time
        var closet_time = playlist.map(d => Math.abs(new Date() - new Date(d.PlayTime).getTime()));
        var idx = closet_time.indexOf(Math.min(...closet_time));

        // if index outof range
        if ( ( idx + 1 ) > ( playlist.length - 1 )){

            playlist_array.push( { pre: playlist[idx-2].prgName , time: this.transferToTime( playlist[idx - 2].PlayTime ) , tag: playlist[idx - 2].prgColumn } );
            playlist_array.push( { now: playlist[idx-1].prgName , time: this.transferToTime( playlist[idx - 1].PlayTime ) , tag: playlist[idx - 1].prgColumn } );
            playlist_array.push( { next: playlist[idx].prgName , time: this.transferToTime( playlist[idx].PlayTime ) , tag: playlist[idx].prgColumn } );
        
        } else {
        
            playlist_array.push( { pre: playlist[idx-1].prgName , time: this.transferToTime( playlist[idx - 1].PlayTime ) , tag: playlist[idx - 1].prgColumn  } );
            playlist_array.push( { now: playlist[idx].prgName , time: this.transferToTime( playlist[idx].PlayTime ) , tag: playlist[idx].prgColumn } );
            playlist_array.push( { next: playlist[idx+1].prgName , time: this.transferToTime( playlist[idx + 1].PlayTime) , tag: playlist[idx + 1].prgColumn  } );            
        
        }

        this.setState({data : playlist_array}); 
    }
    
    componentDidMount(){
        // put this into redux
        fetch('http://localhost:3000/api/v1/chinasun/programlist')
            .then(response => response.json())
            .then(data => this.updateState(data));
    }

    render()
    {
        // render() 在每次 props 或是 state 被改變時，都會被執行一次。
        // const { preNowNext } = this.props.data;
        // const emptyObj = Object.keys(preNowNext).length;

        // get the data from the programlist
        // need to get the data from now

        // get time now and put the data in the list 
        const FADE  = this.state.fade;
        const DATA = this.state.data;

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
