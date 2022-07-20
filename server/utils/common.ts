class Common {
    
    static getCurrentMonday(unixtimestamp) {
        const interval = 24 * 60 * 60 * 1000;
        const timestamp = unixtimestamp > 0?
            unixtimestamp:
            new Date().getTime();
        const currentDayBeforeMonday = (new Date(timestamp).getDay() - 1) * interval;
        const currentMondayTimestamp = timestamp - (timestamp % interval) - currentDayBeforeMonday;        
        const result = new Date(currentMondayTimestamp);
        return result;
    }

    // ++ ToDo: complete exception handler
    static getFormatedDate(date, format = "YYYYMMDD") {
        const raw = date.toISOString().replace("Z", "").split("T");
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
    // data = { a: '56789', b: '2', c: '3', D: '44' };
    // format = 'aaaabbcDDDD'
    // result = '56780230044'
    static dataFormater(data, format) {
        return data.Y + data.M + data.D;
    }
}

export default Common;