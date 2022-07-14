import moment from 'moment';

// transfer datetime to normalized time
function transferToTime(datetime){

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

// add time to week list
function transferToWeek(data) {

        const weekSet = new Set();
        
        data.forEach((item, index)=>
        {
            console.log("index"+index);
            let datetime = moment(new Date(item.PlayTime)).format("YYYY-MM-DD");
            weekSet.add(datetime);
    
        });
        
        return [...weekSet];
    
}

// transfer the weekdata to weekinfo json
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