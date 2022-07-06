import * as nodemailer from 'nodemailer';
import { ERROR_CODE } from './ErrorCode';

class JobWorker {

    constructor() {

    }

    /**
     * run queue
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    // 缺 loop
    static async runQueue(q) {
        return new Promise<any>( async (resolve, reject) => {
            // start to run the queue
            q.start((err)=> {
                if (err) {
                    reject(err)
                    // call push job function
                } else {
                    console.log("all done"+ q.results)
                    resolve(q.results);
                }
            })
        })

    }

    /**
     * original data resource is already formatted,
     * so this function is used to deal with the undefined condition 
     * get the programlist with given options
     * @param data options to start the function with
     * @returns formatted data without undefined
     */   
  

}

export default JobWorker;