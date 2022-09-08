import DateError from './date_error';
import {ERROR_CODE} from 'server/constant/error_code';

class Common {
  /**
   * get the data of the certain week
   * @param unixtimestamp options to start the function with
   * @returns monday date
   */
  static getCurrentMonday(unixtimestamp: number): Date {
    const normalizedTime = new Date(Math.floor(unixtimestamp));
    const normalizedUnixtimestamp = normalizedTime.getTime();
    const offset = normalizedTime.getTimezoneOffset();
    // set the interval and minus the offset to get the local time
    const interval = 24 * 60 * 60 * 1000;
    const timestamp =
      normalizedUnixtimestamp > 0
        ? Math.floor(normalizedUnixtimestamp) - offset * 60 * 1000
        : new Date().getTime();
    const currentDayBeforeMonday = (new Date(timestamp).getDay() - 1) * interval;
    const currentMondayTimestamp = timestamp - (timestamp % interval) - currentDayBeforeMonday;
    const result = new Date(currentMondayTimestamp);

    return result;
  }

  // ++ ToDo: complete exception handler
  /**
   * get the data of the certain week
   * @param date options to start the function with
   * @param format means the format that user want to format the date
   * @returns formatted date
   */
  static async getFormatedDate(date: Date, format = 'YYYYMMDD'): Promise<string> {
    // if date can't be the transfer to date
    try {
      // change time to local time
      const raw = new Date(date.getTime()).toISOString().replace('Z', '').split('T');
      const elements = raw[0].split('-').concat(raw[1].split(':'));
      const data = {
        Y: elements[0],
        M: elements[1],
        D: elements[2],
      };

      const result = this.dataFormater(data, format);
      return result;
    } catch (e) {
      // catch the error (for example: RangeError: invalid date)
      throw new DateError(ERROR_CODE.INVALID_DATE_ERROR, 'invalid date');
    }
  }

  // ++ ToDo: complete formater
  // data = { a: '56789', b: '2', c: '3', D: '44' };
  // format = 'aaaabbcDDDDa'
  // result = '678902300449' 不會互相干擾
  // 補0 , 切割
  // result = '56780230044'
  /**
   * format the data with certain format
   * @param data
   * @param format means the format that user want to format the date
   * @returns formatted date
   */
  static dataFormater(data: object, format: string): string {
    let result = '';
    // 記錄目前 lastChar
    let lastChar = format.charAt(format.length - 1);
    // k = 連續字符的第一個index, j為連續字符的最後一個＋1 的 index
    let k = 0,
      j = 1;
    // num 為連續的總數
    let num = 1;

    for (let i = 0; i < format.length; i++) {
      if (format[k] !== format[j]) {
        // first
        // 重複資料的最後 index = k - 1
        lastChar = format.charAt(j - 1);

        if (lastChar in data) {
          // if format char in data object -> get data object slice,
          // if larger use padding, if not return original result
          result = result + this.PaddingLeft(data[lastChar].slice(-num), num);
        } else {
          // if format char not in data object -> add it directly
          result = result + lastChar;
        }
        // reset
        k = j;
        num = 1;
      } else {
        // accumulate
        num = num + 1;
      }
      // use for for loop
      j = j + 1;
    }
    return result;
  }

  static PaddingLeft(str: string, length: number): string {
    let result;

    if (str.length >= length) {
      result = str;
      return result;
    } else {
      // padding
      result = str;
      result = '0'.repeat(length - str.length) + result;
      return result;
    }
  }
}

export default Common;
