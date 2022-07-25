
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
        // if date can't be the 
        const result = this.dataFormater(data, format);
        return result;
    }

    // ++ ToDo: complete formater
    // data = { a: '56789', b: '2', c: '3', D: '44' };
    // format = 'aaaabbcDDDD'
    // result = '56780230044'
    // 補0 , 切割
    // result = '56780230044'
    static dataFormater(data: object, format: string): string {

        let result = "";
        do{
            const firstChar = format.charAt(0);
            if(data[format.charAt(0)].length !== 0){
                // add char in data to formated_data
                result = result + data[format.charAt(0)][0];
                // pop the element in data
                data[format.charAt(0)] = data[format.charAt(0)].substring(1);
                //  pop the format element
                format = format.substring(1);
            } else if(firstChar==="/"||firstChar==="-"){
                // check not number result=result + format.charAt(0);
                result = result + format.charAt(0);
                format = format.substring(1);
            } else {
                // if no data 補 0
                result = result + "0"
                format = format.substring(1)
            }

        } while (format.length > 0)

        return result;

    }
}

export default Common;