import moment from 'moment';

// A function is used to transfer datetime to normalized time (HH:mm)
/**
 * transfer the datetime to HH:mm
 * @param datetime means a object contains datetime
 */
function transferToTime(datetime) {
  let time = new Date(datetime);
  let hour;
  let min;

  if (time.getHours() < 10) {
    hour = '0' + time.getHours();
  } else {
    hour = time.getHours();
  }

  if (time.getMinutes() < 10) {
    min = '0' + time.getMinutes();
  } else {
    min = time.getMinutes();
  }

  return hour + ':' + min;
}

// A function is used to transfer data to week list
/**
 * transfer the data to week dates
 * @param data means payload from the api
 */
function transferToWeek(data) {
  const weekSet = new Set();
  data.forEach(item => {
    let datetime = moment(new Date(item.PlayTime)).format('YYYY-MM-DD');
    weekSet.add(datetime);
  });

  return [...weekSet];
}

// A function is used to transfer data to weekiInfo object (week dates with corresponding programlist)
/**
 * transfer data to weekInfo object
 * @param data means payload from the api
 * @param week means weekdays from the api
 */
function transferToWeekInfo(data, week) {
  let allWeekInfo = {};

  week.forEach(weekday => {
    let oneWeekInfo = [];

    data.forEach(item => {
      let datetime = moment(new Date(item.PlayTime)).format('YYYY-MM-DD');
      if (datetime === weekday) {
        oneWeekInfo.push(item);
      }
    });

    allWeekInfo[weekday] = oneWeekInfo;
  });

  return allWeekInfo;
}

// A function is used to add active to the class of progrmalist element selected by user
/**
 * @param week means tab of day selected by the user
 */
function getThisWeekDay() {
  const currentWeekdays = [];
  // get monday in this week
  const today = new Date(Date.now());

  // push dates in this week
  for (let i = 0; i < 7; i++) {
    // get the diff of day between day of today and monday
    let day = today.getDate() - today.getDay() + 1 + i;
    let normalizedDay = new Date(today.setDate(day));
    // normalize the day to weekday needed to be pushed to weeklist
    normalizedDay = moment(new Date(normalizedDay)).format('YYYY-MM-DD');
    // push day of this week to CURRENT_WEEKDAYS list
    currentWeekdays.push(normalizedDay);
  }

  return currentWeekdays;
}

export {transferToTime, transferToWeek, transferToWeekInfo, getThisWeekDay};
