import React from 'react';
import PropTypes from 'prop-types';
// import update from 'immutability-helper';
// import moment from 'moment';
import './Chinasuntv.scss';

class Chinasuntv extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fade: 'in'
        };
    }

    componentDidMount()
    {
        // const playerInstance = jwplayer(this.player);
        // playerInstance.setup({
        //     file: `https://stream.chinasuntv.com/680k/mid_video_index.m3u8?${new Date().getTime()}`,
        //     mediaid: '7uAy64Hk'
        // });
        // this.videoPlayer = videojs(this.player);
        // this.videoPlayer.src({ src: `https://stream.chinasuntv.com/680k/mid_video_index.m3u8?date=${new Date() / 1}` });
        // setTimeout(() => {
        //     this.videoPlayer.play();
        // }, 50);
    }

    componentWillReceiveProps()
    {
        // const { preNowNext } = this.props.data;
        // const emptyObj = Object.keys(preNowNext).length;

        // if (emptyObj !== 0)
        // {
        //     const hour = preNowNext.next[0].split(':')[0];

        //     // 早上九點前，時是一位數，最前面補 0
        //     if (moment().format('HH:mm:ss') === (hour.length === 1 ? `0${preNowNext.next[0]}:01` : `${preNowNext.next[0]}:01`))
        //     {
        //         this.setState(update(this.state, {
        //             fade: { $set: 'out' }
        //         }), () => {
        //             setTimeout(() => {
        //                 this.setState(update(this.state, {
        //                     fade: { $set: 'in' }
        //                 }));
        //             }, 800);
        //         });
        //     }
        // }
    }

    render()
    {
        // const { preNowNext } = this.props.data;
        // const emptyObj = Object.keys(preNowNext).length;

        // const { fade } = this.state;

        return (
            <div className="c_chinaSuntv">
                <div className="video">
                    <video
                        preload="true"
                        ref={(video) => { this.player = video; }}
                        className="video-js vjs-big-play-centered"
                        controls
                        onContextMenu={(e) => { e.preventDefault(); }}
                    />
                    developing..
                    <div className="paddingBottom" />
                </div>
            </div>
        );
    }
}

Chinasuntv.propTypes = {
    data: PropTypes.object.isRequired
};

export default Chinasuntv;
