import DateError from "./date_error";
import { ERROR_CODE } from "server/constant/error_code";
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

        // if date can't be the transfer to date
        try {
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
        } catch (e) {
            // catch the error (for example: RangeError: invalid date)
            throw new DateError(ERROR_CODE.INVALID_DATE_ERROR, "invalid date")
        }

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
            // if the length of string mapped by format key in data object !== 0 
            if(data[firstChar].length !== 0){
                // add char in data to result
                result = result + data[firstChar][0];
                // pop the element in data object (because it's added in result now)
                data[firstChar] = data[firstChar].substring(1);
                // pop the format element (because we met the requirement before)
                format = format.substring(1);
            // check firstChar == "/" or "-" which is not in data object
            } else if(firstChar === "/" || firstChar === "-"){
                // check not number result = result + firstChar;
                result = result + firstChar;
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