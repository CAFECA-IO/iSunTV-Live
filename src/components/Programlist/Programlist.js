import React from 'react';
import PropTypes from 'prop-types';
import equal from 'deep-equal';
import update from 'immutability-helper';
import moment from 'moment';
import './Programlist.scss';

// change the programlist here
// we need to change prop to our locql componentdatamount data first 
class ProgramList extends React.Component
{
    constructor(props)
    {
        const day = new Date().getDay();
        super(props);
        this.state = {
            tabs: {
                Mon: day === 1 ? 'active' : '',
                Tue: day === 2 ? 'active' : '',
                Wed: day === 3 ? 'active' : '',
                Thu: day === 4 ? 'active' : '',
                Fri: day === 5 ? 'active' : '',
                Sat: day === 6 ? 'active' : '',
                Sun: day === 0 ? 'active' : ''
            },
            data: null,
            week: null
        };

        this.day = new Date().toString().slice(0, 3);
        this.selectProgrmaList = this.selectProgrmaList.bind(this);
    }

    // transferToTime(datetime){

    //     let time = new Date(datetime);
    //     let hour;
    //     let min;

    //     if(time.getHours() < 10){
    //         hour = '0' + time.getHours();
    //     } else {
    //         hour = time.getHours();
    //     }
        
    //     if(time.getMinutes() < 10){
    //         min = '0' + time.getMinutes();
    //     } else {
    //         min = time.getMinutes();
    //     }

    //     return hour + ":" + min;
    // }

    updateState(data){ 
        const WEEK = this.transferToWeek(data.payload) ;
        this.setState({data : data.payload, week: WEEK, weekInfo: this.transferToWeekInfo(data.payload, WEEK) }); 
    }

    // add time to week list
    transferToWeek(data){

        const weekSet = new Set();
        
        data.forEach((item, index)=>
        {
            console.log("index"+index);
            let datetime = moment(new Date(item.PlayTime)).format("YYYY-MM-DD");
            weekSet.add(datetime);
    
        });
        
        return [...weekSet];
    
    }

    transferToWeekInfo(data, week) {
        
        let allWeekInfo = {};

        week.forEach((weekday)=> {

            let oneWeekInfo = [];
            
            data.forEach((item)=>
            {
                let datetime = moment(new Date(item.PlayTime)).format("YYYY-MM-DD");
                if (datetime === weekday) {
                    oneWeekInfo.push(item);
                }
            });
            allWeekInfo[weekday] = oneWeekInfo;
            console.log(allWeekInfo[weekday]);
        });
        
        return allWeekInfo;
    
    }

    transferToTime(datetime){

        //  沒有處理到不同的時區換算的問題
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

    componentDidMount()
    {
        // 需要共用state -> 移動到redux (需要fix這邊的問題)
        fetch('http://localhost:3000/api/v1/chinasun/programlist')
            .then(response => response.json())
            .then(data => {this.updateState(data)});
        // setTimeout(() => {
        //     const scroll = document.querySelector('.scroll');
        //     scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
        // }, 500);

    }

    // componentWillReceiveProps(nextProps)
    // {
    //     const scroll = document.querySelector('.scroll');

    //     if (scroll !== null && !equal(nextProps, this.props))
    //     {
    //         let obj = {
    //             Mon: '',
    //             Tue: '',
    //             Wed: '',
    //             Thu: '',
    //             Fri: '',
    //             Sat: '',
    //             Sun: ''
    //         };
    //         const day = new Date().toString().slice(0, 3);

    //         obj[day] += 'active';
    //         this.day = day;
    //         this.setState(update(this.state, {
    //             tabs: { $set: obj }
    //         }));

    //         scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
    //     }
    // }

    // componentDidUpdate()
    // {
    //     const now  =  this.transferToTime(Date.now());
    //     const scroll = document.querySelector('.scroll');
    //     const nowTime = moment().format('HH:mm:ss');
    //     // didn't get any data
    //     const hour = now.splice(0,2);

    //     if (scroll !== null)
    //     {
    //         if (nowTime === hour)
    //         {
    //             scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
    //         }
    //     }
    // }

    selectProgrmaList(week)
    {
        this.day = week;

        let obj = {
            Mon: '',
            Tue: '',
            Wed: '',
            Thu: '',
            Fri: '',
            Sat: '',
            Sun: ''
        };

        obj[week] += 'active';

        this.setState(update(this.state, {
            tabs: { $set: obj }
        }));
    }

    renderTabs()
    {
        const TABS = this.state.tabs;
        // week =  當周 weeklist
        const WEEK = this.state.week;
        const TODAYDAY = new Date().getDay(); //    今天星期幾？
        let weekTabs = [];
        let today;
        let yesterday;
        let tomorrow;
        let chineseWeek = {
            Mon: 'ㄧ',
            Tue: '二',
            Wed: '三',
            Thu: '四',
            Fri: '五',
            Sat: '六',
            Sun: '日',
        };

        // for RWD
        switch (moment().format('dddd').slice(0, 3))
        {
            case 'Mon':
                yesterday = -1;
                today = 0;
                tomorrow = 1;
                break;
            case 'Tue':
            case 'Wed':
            case 'Thu':
            case 'Fri':
            case 'Sat':
                yesterday = 0;
                today = 1;
                tomorrow = 2;
                break;
            case 'Sun':
                yesterday = 1;
                today = 2;
                tomorrow = 3;
                break;
            default:
        }

        if(!!WEEK){
            let index = 0;
            WEEK.forEach((date)=>
            {
                // 用 api 傳回的年份月份日期陣列，取得日期
                // 用 moment 以日期取得星期幾
                const WEEKDATE = moment(new Date(date)).format('dddd').slice(0, 3);
    
                const DAY = chineseWeek[WEEKDATE];
                const DATE_NUM = date.slice(-2);

                if (index === 0){
                    if(WEEKDATE === 'Sun') {
                        // pass
                    } else {
                        const CONTENT = (
                            <div
                                key={DATE_NUM}
                                className={`${TABS[WEEKDATE]}${TODAYDAY === Number(index) + today || TODAYDAY === Number(index) + yesterday || TODAYDAY === Number(index) + tomorrow ? '' : ' hidden'}`}
                                onClick={() => this.selectProgrmaList(WEEKDATE)}
                            >
                                <div>{DATE_NUM}<span>{DAY}</span></div>
                            </div>
                        );
                        weekTabs.push(CONTENT);
                    }
                } else {
                    const CONTENT = (
                        <div
                            key={DATE_NUM}
                            className={`${TABS[WEEKDATE]}${TODAYDAY === Number(index) + today || TODAYDAY === Number(index) + yesterday || TODAYDAY === Number(index) + tomorrow ? '' : ' hidden'}`}
                            onClick={() => this.selectProgrmaList(WEEKDATE)}
                        >
                            <div>{DATE_NUM}<span>{DAY}</span></div>
                        </div>
                    );
                    weekTabs.push(CONTENT);
                }
                index = index + 1;
            });
        }

        return (
            <div>
                {weekTabs}
            </div>
        );
    }

    renderProgramList()
    {
        // need to organize the programInfo data structure
        const week = this.state.week;
        const weekInfo = this.state.weekInfo;
        console.log(this.state);
        let programList = [];

        if (!!week) {

            let day = {
                Mon: week[0],
                Tue: week[1],
                Wed: week[2],
                Thu: week[3],
                Fri: week[4],
                Sat: week[5],
                Sun: week[6]
            };
    
            let arr;
            console.log(day);
            switch (this.day)
            {
                case 'Mon':
                    arr = weekInfo[day.Mon];
                    break;
                case 'Tue':
                    arr = weekInfo[day.Tue];
                    break;
                case 'Wed':
                    arr = weekInfo[day.Wed];
                    break;
                case 'Thu':
                    arr = weekInfo[day.Thu];
                    break;
                case 'Fri':
                    arr = weekInfo[day.Fri];
                    break;
                case 'Sat':
                    arr = weekInfo[day.Sat];
                    break;
                case 'Sun':
                    arr = weekInfo[day.Sun];
                    break;
                default:
            }
            console.log(arr);
            for (let item of arr)
            {
                const content = (
                    <div key={this.transferToTime(item.PlayTime)} className = 'scroll'>
                        <div>{this.transferToTime(item.PlayTime)}</div>
                        <div><div>{item.prgColumn}</div></div>
                        <div>{item.prgName}</div>
                    </div>
                );
    
                programList.push(content);
            }
        }


        return (
            <div className="programList">
                <div className="programContainer">
                    {programList}
                </div>
            </div>
        );
      
    }

    render()
    {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;

        return (
            <div className="c_programList">
                <div className="date">
                    <div>{`${year}年${month}月`}</div>
                </div>
                <div className="tabs">
                    {this.renderTabs()}
                </div>
                {this.renderProgramList()}
            </div>
        );
    }
}

ProgramList.propTypes = {
    data: PropTypes.object.isRequired
};

export default ProgramList;
