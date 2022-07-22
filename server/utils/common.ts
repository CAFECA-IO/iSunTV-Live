// define the type of the date ibj
type dateJson = {
    Y: string;
    M: string;
    D: string;
}

class Common {

    // type input getCurrentMonday
    // type output getCurrentMonday
    // 加上 變數type註解
    static getCurrentMonday(unixtimestamp: number): Date {

        const interval = 24 * 60 * 60 * 1000;
        const timestamp = unixtimestamp > 0 ? unixtimestamp: new Date().getTime();
        const currentDayBeforeMonday = (new Date(timestamp).getDay() - 1) * interval;
        const currentMondayTimestamp = timestamp - (timestamp % interval) - currentDayBeforeMonday;        
        const result = new Date(currentMondayTimestamp);

        return result;
    
    }

    // ++ ToDo: complete exception handler

    static getFormatedDate(date: Date, format = "YYYYMMDD"): string {

        // change time to local time
        const off = date.getTimezoneOffset();
        const raw = new Date(date.getTime() - off*60*1000).toISOString().replace("Z", "").split("T");
        const elements = raw[0].split("-").concat(raw[1].split(":"));
        const data = {
            Y: elements[0],
            M: elements[1],
            D: elements[2]
        };
        const result = this.dataFormater(data, format);
        return result;
    }

    // ++ ToDo: complete formater
    // data = { a: '56789', b: '2', c: '3' , d: '0044'};
    // format = 'YYYYMMDD'
    // 補0 , 切割
    // result = '56780230044'
    static dataFormater(data: object, format: string): string {
        // set values here
        // if user input two numbers-> return 20xx
        // input buffer and meet the format
        // key 不一定相
        // check if the string can be transfered to
        const formatData = {
            Y: data.Y,
            M: data.M,
            D: data.D            
        };


        let result;

        // if Y.length < 4 ,add 0 to end of the string
        if(data.Y.length < 4) {

            for (let i = data.Y.length ; i < 4; i++) {
                formatData.Y = formatData.Y + "0";
            }

        }
        // if M.length < 2 ,add 0 to front of the string
        if(data.M.length < 2) {
            formatData.M = '0' + formatData.M;
        } 
        // if D.length < 2 ,add 0 to front of the string
        if(data.D.length < 2) {
            formatData.D = '0' + formatData.D;
        }

        // deal with different format
        switch (format) {

            case 'YYYYMMDD':
                result = formatData.Y + formatData.M + formatData.D;                 
                break;
            
            case 'YYYY-MM-DD':
                result = formatData.Y + "-" + formatData.M + "-" + formatData.D;    
                break;
            
            case 'YYYY/MM/DD':
                result = formatData.Y + "/" + formatData.M + "/" + formatData.D;    
                break;
            
            default:
                // return YYYYMMDD
                result = formatData.Y + formatData.M + formatData.D;    
                break;
        
        }

        return result;

    }
}

export default Common;