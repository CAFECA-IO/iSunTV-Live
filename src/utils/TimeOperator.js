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

    if(time.getHours() < 10) {
        hour = '0' + time.getHours();
    } else {
        hour = time.getHours();
    }
    
    if(time.getMinutes() < 10) {
        min = '0' + time.getMinutes();
    } else {
        min = time.getMinutes();
    }

    return hour + ":" + min;
}

// A function is used to transfer data to week list 
/**
 * transfer the data to week dates 
 * @param data means payload from the api
 */
function transferToWeek(data) {

        const weekSet = new Set();
        
        data.forEach((item, index) => {

            let datetime = moment(new Date(item.PlayTime)).format("YYYY-MM-DD");
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

        });
        
        return allWeekInfo;
    
}

export { transferToTime, transferToWeek, transferToWeekInfo};