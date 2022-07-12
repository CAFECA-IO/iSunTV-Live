import React from 'react';
import PropTypes from 'prop-types';
import equal from 'deep-equal';
import update from 'immutability-helper';
import moment from 'moment';
import './Programlist.scss';

// immutability-helper check** -> need to be used?
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
            }
        };

        this.day = new Date().toString().slice(0, 3);
        this.selectProgrmaList = this.selectProgrmaList.bind(this);
    }

    componentDidMount()
    {
        setTimeout(() => {
            const scroll = document.querySelector('.scroll');
            scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
        }, 500);
    }

    componentWillReceiveProps(nextProps)
    {
        const scroll = document.querySelector('.scroll');

        if (scroll !== null && !equal(nextProps, this.props))
        {
            let obj = {
                Mon: '',
                Tue: '',
                Wed: '',
                Thu: '',
                Fri: '',
                Sat: '',
                Sun: ''
            };
            const day = new Date().toString().slice(0, 3);

            obj[day] += 'active';
            this.day = day;
            this.setState(update(this.state, {
                tabs: { $set: obj }
            }));

            scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
        }
    }

    componentDidUpdate()
    {
        const { now } = this.props.data.preNowNext;
        const scroll = document.querySelector('.scroll');
        const nowTime = moment().format('HH:mm:ss');
        // didn't get any data
        const hour = now[0].split(':')[0];

        if (scroll !== null)
        {
            if (nowTime === (hour.length === 1 ? `0${now[0]}:01` : `${now[0]}:01`))
            {
                scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
            }
        }
    }

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
        const { tabs } = this.state;
        const { week } = this.props.data.programInfo;
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

        for (let key in week)
        {
            // 用 api 傳回的年份月份日期陣列，取得日期
            // 用 moment 以日期取得星期幾
            const date = week[key].split('/')[1];
            const weekDate = moment(new Date(week[key])).format('dddd').slice(0, 3);

            const day = chineseWeek[weekDate];

            const content = (
                <div
                    key={week[key]}
                    className={`${tabs[weekDate]}${todayDay === Number(key) + today || todayDay === Number(key) + yesterday || todayDay === Number(key) + tomorrow ? '' : ' hidden'}`}
                    onClick={() => this.selectProgrmaList(weekDate)}
                >
                    <div>{date}<span>{day}</span></div>
                </div>
            );
            weekTabs.push(content);
        }

        return (
            <div>
                {weekTabs}
            </div>
        );
    }

    renderProgramList()
    {
        const { week, weekInfo } = this.props.data.programInfo;
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

        let programList = [];
        const nowPlay = Object.keys(this.props.data.preNowNext).length !== 0 ? this.props.data.preNowNext.now[0] : '';

        if (Object.keys(this.props.data.preNowNext).length !== 0)
        {
            for (let item of arr)
            {
                const content = (
                    <div key={item.PlayTime} className={item.PlayTime.split(' ')[1] === nowPlay ? 'scroll' : ''}>
                        <div>{item.PlayTime.split(' ')[1]}</div>
                        <div><div>{item.prgColumn}</div></div>
                        <div>{item.prgName}</div>
                    </div>
                );

                programList.push(content);
            }

            return (
                <div className="programList">
                    <div className="programContainer">
                        {programList}
                    </div>
                </div>
            );
        }
        else
        {
            return null;
        }
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
                </div>
                ProgramList
            </div>
        );
    }
}

ProgramList.propTypes = {
    data: PropTypes.object.isRequired
};

export default ProgramList;
