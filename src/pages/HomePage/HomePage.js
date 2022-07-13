import React, { Fragment } from "react";
// import Video from "../../components/Video";
import Header from '../../components/Header/Header';
import FOOTER from "../../components/Footer/Footer";
import Chinasuntv from "../../components/Chinasuntv/chinaSuntv";
import ProgramList from "../../components/Programlist/Programlist";
import Contact from "../../components/Contact/Contact";
import About from "../../components/About/About";
import './HomePage.scss';


    // home page play details
    // const PLAY_DETAILS = {
    //     fill: true,
    //     fluid: true,
    //     autoplay: true,
    //     controls: true,
    //     preload: "metadata",
    //     sources: [
    //       {
    //         src: "https://stream.chinasuntv.com/680k/mid_video_index.m3u8",
    //         type: "application/x-mpegURL"
    //       }
    //     ]
    //   };

 // <Video {...PLAY_DETAILS} />

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            nowTime: new Date() / 1,
            info: {}
        };
        
    }

    componentDidMount()
    {
        // this.props.actions.chinaSuntvAction.getChinaSuntv();

        // setInterval(() => {
        //     const taipeiTime = moment.tz('Asia/Taipei').format();

        //     this.setState(update(this.state, {
        //         nowTime: { $set: new Date(taipeiTime) / 1 }
        //     }), () => {
        //         // 若現在時間 星期是禮拜一 且 時間是凌晨00:00:00整，更新節目表！
        //         if (moment(this.state.nowTime).format('dddd') === 'Monday' && moment(this.state.nowTime).format('LTS') === '12:00:00 AM')
        //         {
        //             this.props.actions.chinaSuntvAction.getChinaSuntv();
        //         }
        //     });
        // }, 1000);
    }

    // shouldComponentUpdate(nextProps)
    // {
    //     const arr = this.props.chinaSuntv.info.week.length === 0 ? [] : this.getPreNowNext().now;
    //     const hour = moment(new Date(this.state.nowTime)).format('HH');
    //
    //     if (moment(new Date(this.state.nowTime)).format('HH:mm:ss') === (hour.length === 1 ? `0${arr[0]}:00` : `${arr[0]}:00`))
    //     {
    //         return true;
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }

    // getPreNowNext()
    // {
    //     // 找出當天是禮拜幾
    //     const whichDay = new Date().getDay();
    //     const { nowTime } = this.state;

    //     // 減 1 找出在陣列中的 index
    //     let today = (whichDay === 0) ? 6 : whichDay - 1;
    //     const { info } = this.props.chinaSuntv;

    //     // week:當天日期；weekInfo:當天節目表
    //     let week = info.week[today];
    //     let weekInfo = info.weekInfo[week];
    //     let programPlayed = [];
    //     let preNowNext = {
    //         pre: [],
    //         now: [],
    //         next: []
    //     };

    //     for (let item of weekInfo)
    //     {
    //         const content = (
    //             <div key={item.PlayTime}>
    //                 <div>{item.PlayTime.split(' ')[1]}</div>
    //                 <div><div>{item.prgColumn}</div></div>
    //                 <div>{item.prgName}</div>
    //             </div>
    //         );

    //         // 把已播出的節目存在陣列，即可知前一節目
    //         if (nowTime > new Date(item.PlayTime) / 1)
    //         {
    //             programPlayed.push(content);
    //         }
    //     }

    //     // 前一節目的 index
    //     const prePlayed = programPlayed.length - 2;

    //     Object.keys(preNowNext).map((item, index) => {
    //         let play = prePlayed + index;

    //         // 若是當天最晚節目，要取到隔天的第一筆節目
    //         if (play === weekInfo.length)
    //         {
    //             week = info.week[whichDay];
    //             weekInfo = info.weekInfo[week];
    //             play = 0;
    //         }
    //         // 若現在時間是當天最早節目，要取到昨天的最後一筆節目
    //         else if (play === -1)
    //         {
    //             const day = whichDay - 1 <= 0 ? 0 : whichDay - 2;
    //             week = info.week[day];
    //             weekInfo = info.weekInfo[week];
    //             play = weekInfo.length - 1;
    //         }
    //         // 若現在時間是還在播前一天最後一個節目
    //         else if (play === -2)
    //         {
    //             const day = whichDay - 2 <= 0 ? 0 : whichDay - 2;
    //             week = info.week[day];
    //             weekInfo = info.weekInfo[week];
    //             play = weekInfo.length - 2;
    //         }
    //         else
    //         {
    //             week = info.week[today];
    //             weekInfo = info.weekInfo[week];
    //         }

    //         return preNowNext[item].push(weekInfo[play].PlayTime.split(' ')[1], weekInfo[play].prgColumn, weekInfo[play].prgName);
    //     });

    //     return preNowNext;
    // }

    render()
    {
      // const preNowNext = this.props.chinaSuntv.info.week.length === 0 ? {} : this.getPreNowNext();
      console.log("redux data");
      console.log(this.props.name);
      return (
        <Fragment>
          <Header></Header>
          <div className = "container">
            <Chinasuntv></Chinasuntv>
            <ProgramList></ProgramList>
            <About></About>
            <Contact></Contact>
            <FOOTER></FOOTER>
          </div>
        </Fragment>
      );
    } 
}

export default HomePage;