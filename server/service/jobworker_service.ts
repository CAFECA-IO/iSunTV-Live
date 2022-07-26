import SendMail from '../utils/sendmail';

type emailConfig = {
    googleClientID: string; 
    googleClientPassword: string; 
}

class JobWorker {

    /** @param {any} jobQueue default job queue*/
    jobQueue : any;
    /** @param {object} config default email config*/
    config : emailConfig;

    //the class constructor
    /**
     * set the default constructor without param
     */
    constructor() {
        // nothing to do
    }

    /**
     * initialize the jobworker
     * @param q means job queue
     * @param config means email config
     */
    initialize(q: any, config: emailConfig){
        
        this.jobQueue = q;
        this.config = config;

    }

    // getQueueStatus(q) {
        
    //     return q;
    
    // }

    /**
     * push queue to the bottom
     * @param config means email config
     * @param comment means email comment
     * @returns a promise resolved result when the function is ready to be called
     */
    pushQueue(config: emailConfig, comment: string): Promise<any> {

        // push new job
        return this.jobQueue.push(() => {

            return SendMail.sendMail(config, comment);

        });
    
    }

    /**
     * run queue loop
     * @param q means queue
     * @param config means email config
     * @param config means email comment
     * @returns a promise resolved result when the function is ready to be called
     */
    async runQueueLoop(q: any, config: emailConfig, comment: string) {

        const runQueue = this.runQueue;

        let result;
        let stopFlag = 0;
        
        // do while loop until all jobs are completed.
        do {
            // call run queue to call the sendmail job
            result = await runQueue(q, config, comment);
            
            // print success if all jobs are complete
            if (result != "error") {
    
                stopFlag = 1;
                return result;
            
            } else {
                // if meet error then run the next job
                stopFlag = 0;
            
            }

        } while ( stopFlag == 0 );

    }

    /**
     * wake up the worker to run jobQueue loop
     * @param comment means email comment
     */
    workerOn(comment: string): string {

        const q = this.jobQueue;
        const config = this.config;

        // don't wait for runQueueLoop being completed
        this.runQueueLoop(q, config, comment);
        
        // return worker ia awake immediately
        return "worker is awake";
    
    }

    /**
     * run queue
     * @param q means queue
     * @param config means email config
     * @param comment means email comment
     * @returns a promise resolved result when the function is ready to be called
     */
    async runQueue(q: any, config: emailConfig, comment: string) {
            
        // start to run the queue
        q.start((err)=> {

            if (err) {
                // call push job function
                q.push(() => {
                    return SendMail.sendMail(config, comment);          
                });

                // add job worker error
                throw(err);        
                
            } else {
                
                return(q.results);
            
            }
        
        })

    }  
  

}

export default JobWorker;