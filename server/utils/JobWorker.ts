import { ERROR_CODE } from './ErrorCode';
import SendMail from './SendMail';

class JobWorker {

    private static jobQueue = null;
    private static config = null;

    constructor() {

    }

    initialize(q, config){
        
        JobWorker.jobQueue = q;
        JobWorker.config = config;

    }

    static getQueueStatus(q) {
        
        return q;
    
    }

    static pushQueue(q, config) {

        q.push(function () {

            return SendMail.sendMail(config);          
        
        });
    
    }

    static async workerOn() {

        let q = JobWorker.jobQueue;

        return new Promise<any>( async (resolve, reject) => {
        
            let result;
            let stopFlag = 0;
            
            // do while loop means it will
            do {

                result = await JobWorker.runQueue();
                
                // if result! = error, job worker is not the  
                if (result != "error" || JobWorker.getQueueStatus(q).pending != 0) {
                
                    stopFlag = 1;
                
                } else {
                    
                    resolve(result);
                }
                
                console.log(JobWorker.getQueueStatus(q).pending);
                console.log(result);

                } while ( stopFlag == 0 );
        
        });
    
    }
    /**
     * run queue
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async runQueue() {
        
        let q = JobWorker.jobQueue;

        return new Promise<any>( async (resolve, reject) => {
            
            // start to run the queue
            q.start((err)=> {

                if (err) {
                    // call push job function
                    q.push(function () {
                        return SendMail.sendMail(JobWorker.config);                        
                    });

                    console.log(err);
                    // add job worker error
                    reject(err);        
                    
                } else {
                    
                    console.log(q.results);
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