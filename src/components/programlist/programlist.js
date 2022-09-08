/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import PropTypes from 'prop-types';
import {
  transferToTime,
  transferToWeek,
  transferToWeekInfo,
  getThisWeekDay,
} from '../../utils/time_operator';
import update from 'immutability-helper';
import moment from 'moment';
import './programlist.scss';

// change the programlist here
// we need to change prop to our upper class's (APP) componentdatamount data first
class ProgramList extends React.Component {
  constructor(props) {
    const DAY = new Date().getDay();
    super(props);

    this.state = {
      tabs: {
        Mon: DAY === 1 ? 'active' : '',
        Tue: DAY === 2 ? 'active' : '',
        Wed: DAY === 3 ? 'active' : '',
        Thu: DAY === 4 ? 'active' : '',
        Fri: DAY === 5 ? 'active' : '',
        Sat: DAY === 6 ? 'active' : '',
        Sun: DAY === 0 ? 'active' : '',
      },
      data: null,
      weekInfo: null,
    };

    this.day = new Date().toString().slice(0, 3);
    this.selectProgrmaList = this.selectProgrmaList.bind(this);
  }

  // A function is used to update the week state
  /**
   * @param data means payload data from the api
   */
  updateState(data) {
    // no payload
    const week = 'payload' in data === true ? transferToWeek(data['payload']) : [];
    this.setState({data: data.payload, weekInfo: transferToWeekInfo(data.payload, week)});
  }

  // componentDidMount is used to fetch the data now
  componentDidMount() {
    // fetch the programlist from api
    fetch('/api/v1/chinasun/programlist')
      .then(response => response.json())
      .then(data => {
        this.updateState(data);
      });
  }

  // A function is used to add active to the class of progrmalist element selected by user
  /**
   * @param week means tab of day selected by the user
   */
  selectProgrmaList(week) {
    this.day = week;

    let obj = {
      Mon: '',
      Tue: '',
      Wed: '',
      Thu: '',
      Fri: '',
      Sat: '',
      Sun: '',
    };

    obj[week] += 'active';

    this.setState(
      update(this.state, {
        tabs: {$set: obj},
      })
    );
  }

  // A function is used to render the days this week
  renderTabs() {
    /** @param {object} TABS tabs's classname of active selected by user*/
    const tabs = this.state.tabs;
    const week = getThisWeekDay();
    const todayDay = new Date().getDay();

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

    // if week contains things
    if (!!week) {
      let index = 0;

      week.forEach(date => {
        // get the weekdate in this week
        const weekDate = moment(new Date(date)).format('dddd').slice(0, 3);
        const DAY = chineseWeek[weekDate];
        const DATE_NUM = date.slice(-2);

        let now_tag = '';

        // if it's today , add "now" class name
        if (weekDate === moment().format('dddd').slice(0, 3)) {
          now_tag = 'now';
        }

        // set the tab content
        const CONTENT = (
          <div
            key={DATE_NUM}
            className={`${now_tag} ${tabs[weekDate]}${
              todayDay === Number(index) + today ||
              todayDay === Number(index) + yesterday ||
              todayDay === Number(index) + tomorrow
                ? ''
                : ' hidden'
            }`}
            onClick={() => this.selectProgrmaList(weekDate)}
          >
            <div>
              {DATE_NUM}
              <span>{DAY}</span>
            </div>
          </div>
        );

        // push each element's content to weekTabs
        weekTabs.push(CONTENT);
      });
    }

    // return the weektabs
    return <div>{weekTabs}</div>;
  }

  // A function is used to render programlist this week
  renderProgramList() {
    // need to organize the programInfo data structure
    const week = getThisWeekDay();
    const weekInfo = this.state.weekInfo;
    let programList = [];

    // if week info contains things
    if (weekInfo !== null) {
      let day = {
        Mon: week[0],
        Tue: week[1],
        Wed: week[2],
        Thu: week[3],
        Fri: week[4],
        Sat: week[5],
        Sun: week[6],
      };

      let arr;

      // if data == data in this week
      if (typeof weekInfo[day.Mon] !== 'undefined') {
        // if we get weekInfo this week, we set the action of changing info which could be triggered by the user's selection
        switch (this.day) {
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
      } else {
        // if we didn't get weekInfo this week, set arr = []
        arr = [];
      }

      // return the programlist of certain day
      for (let item of arr) {
        const content = (
          <div key={transferToTime(item.PlayTime)} className="scroll">
            <div>{transferToTime(item.PlayTime)}</div>
            <div>
              <div>{item.prgColumn}</div>
            </div>
            <div>{item.prgName}</div>
          </div>
        );

        // push every program to the programlist
        programList.push(content);
      }

      // if no data, return tab of "目前無資料"
      if (programList.length === 0) {
        const noContent = <div className="no_content">目前尚無資料</div>;
        // push element of no data to the programlist
        programList.push(noContent);
      }
    }

    // return programlist
    return (
      <div className="programList">
        <div className="programContainer">{programList}</div>
      </div>
    );
  }

  // A function is used to render programlist
  render() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    // return the programlist data this week
    return (
      <div className="c_programList">
        <div className="date">
          <div>{`${year}年${month}月`}</div>
        </div>
        <div className="tabs">{this.renderTabs()}</div>
        {this.renderProgramList()}
      </div>
    );
  }
}

ProgramList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProgramList;
