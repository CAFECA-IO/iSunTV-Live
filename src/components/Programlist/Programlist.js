/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import PropTypes from 'prop-types';
import { transferToTime, transferToWeek, transferToWeekInfo } from '../../utils/TimeOperator';
import update from 'immutability-helper';
import moment from 'moment';
import './Programlist.scss';

// change the programlist here
// we need to change prop to our upper class's (APP) componentdatamount data first 
class ProgramList extends React.Component {

    constructor(props) {

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

    updateState(data) {

        const WEEK = transferToWeek(data.payload) ;
        // 
        this.setState({data : data.payload, weekInfo: transferToWeekInfo(data.payload, WEEK) }); 
    
    }

    componentDidMount() {
        
        // fetch the url 
        fetch('http://localhost:3000/api/v1/chinasun/programlist')
            .then(response => response.json())
            .then(data => { this.updateState(data) });
        // setTimeout(() => {
        //     const scroll = document.querySelector('.scroll');
        //     scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
        // }, 500);

    }

    selectProgrmaList(week) {

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

    getThisWeekDay() {

        const CURRENT_WEEKDAYS = [];
        // get monday in this week
        const TODAY = new Date(Date.now());

        // push dates in this week
        for ( let i = 0; i < 7 ; i++ ) {

            let day = TODAY.getDate() - TODAY.getDay() + 1 + i;

            let normalizedDay  = new Date(TODAY.setDate(day));
            normalizedDay = moment(new Date(normalizedDay)).format('YYYY-MM-DD');
            CURRENT_WEEKDAYS.push(normalizedDay);
        
        }
        
        return CURRENT_WEEKDAYS;
    
    }
    
    renderTabs() {

        const TABS = this.state.tabs;
        // week =  當周 weeklist
        const WEEK = this.getThisWeekDay();

        const TODAYDAY = new Date().getDay(); // 今天星期幾？
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
        switch (moment().format('dddd').slice(0, 3)) {

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

        if(!!WEEK) {

            let index = 0;
            
            WEEK.forEach((date)=> {

                // 用 api 傳回的年份月份日期陣列，取得日期
                // 用 moment 以日期取得星期幾
                const WEEKDATE = moment(new Date(date)).format('dddd').slice(0, 3);
                const DAY = chineseWeek[WEEKDATE];
                const DATE_NUM = date.slice(-2);

                let now_tag = '';

                // if today , add now class name 
                if (WEEKDATE === moment().format('dddd').slice(0, 3)) {

                    now_tag = 'now';
                
                }

                if (index === 0){

                    if(WEEKDATE === 'Sun') {
                    
                        // pass
                    
                    } else {
                    
                        const CONTENT = (
                            <div
                                key={DATE_NUM}
                                className={`${now_tag} ${TABS[WEEKDATE]}${TODAYDAY === Number(index) + today || TODAYDAY === Number(index) + yesterday || TODAYDAY === Number(index) + tomorrow ? '' : ' hidden'}`}
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
                            key = { DATE_NUM }
                            className={`${now_tag} ${TABS[WEEKDATE]}${TODAYDAY === Number(index) + today || TODAYDAY === Number(index) + yesterday || TODAYDAY === Number(index) + tomorrow ? '' : ' hidden'}`}
                            onClick={() => this.selectProgrmaList(WEEKDATE)}
                        >
                            <div>{ DATE_NUM }<span>{ DAY }</span></div>
                        </div>
                    );
                    weekTabs.push(CONTENT);
                
                }
                
                index = index + 1;
            
            });
        
        }

        return (
            <div>
                { weekTabs }
            </div>
        );
    
    }

    renderProgramList() {

        // need to organize the programInfo data structure
        const week = this.getThisWeekDay();
        const weekInfo = this.state.weekInfo;
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
            console.log(weekInfo);

            let arr;
            if (typeof(weekInfo) == 'undefined') {

                arr = [];
            
            } else {

                switch (this.day) {

                    case 'Mon':
                        if(typeof(weekInfo[day.Mon]) == 'undefined') {
                            arr = [];
                            break;
                        } else {
                            arr = weekInfo[day.Mon];
                            break;
                        }
                    case 'Tue':
                        if(typeof(weekInfo[day.Tue]) == 'undefined') {
                            arr = [];
                            break;
                        } else {
                            arr = weekInfo[day.Tue];
                            break;
                        }
                    case 'Wed':
                        if(typeof(weekInfo[day.Wed]) == 'undefined') {
                            arr = [];
                            break;
                        } else {
                            arr = weekInfo[day.Wed];
                            break;
                        }
                    case 'Thu':
                        if(typeof(weekInfo[day.Thu]) == 'undefined') {
                            arr = [];
                            break;
                        } else {
                            arr = weekInfo[day.Thu];
                            break;
                        }
                    case 'Fri':
                        if(typeof(weekInfo[day.Fri]) == 'undefined') {
                            arr = [];
                            break;
                        } else {
                            arr = weekInfo[day.Fri];
                            break;
                        }
                    case 'Sat':
                        if(typeof(weekInfo[day.Sat]) == 'undefined') {
                            arr = [];
                            break;
                        } else {
                            arr = weekInfo[day.Sat];
                            break;
                        }
                    case 'Sun':
                        if(typeof(weekInfo[day.Sun]) == 'undefined') {
                            arr = [];
                            break;
                        } else {
                            arr = weekInfo[day.Sun];
                            break;
                        }
                    default:
                
                }
            
            }

            for (let item of arr) {

                const CONTENT = (
                
                    <div key = { transferToTime(item.PlayTime) } className = 'scroll'>
                        <div>{ transferToTime(item.PlayTime) }</div>
                        <div><div>{ item.prgColumn }</div></div>
                        <div>{ item.prgName }</div>
                    </div>
                
                );
    
                programList.push(CONTENT);
            
            }

            if (programList.length === 0) {

                const CONTENT_NULL = (
                
                    <div className = 'no_content'>
                        目前無資料
                    </div>
                
                );
    
                programList.push(CONTENT_NULL);                
            }
            
            console.log(programList);
        
        }


        return (
        
            <div className="programList">
                <div className="programContainer">
                    { programList }
                </div>
            </div>
        
        );
      
    }

    render() {

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;

        // get month then use the month to get the programlist 
        return (
        
            <div className="c_programList">
                <div className="date">
                    <div>{ `${year}年${month}月` }</div>
                </div>
                <div className="tabs">
                    { this.renderTabs() }
                </div>
                { this.renderProgramList() }
            </div>
        
        );
    
    }

}

ProgramList.propTypes = {

    data: PropTypes.object.isRequired

};

export default ProgramList;
