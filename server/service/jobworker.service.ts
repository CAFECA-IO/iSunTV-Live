import SendMail from '../utils/SendMail';

class JobWorker {

    jobQueue : any;
    config : any;

    constructor() {

    }

    initialize(q, config){
        
        this.jobQueue = q;
        this.config = config;

    }

    // getQueueStatus(q) {
        
    //     return q;
    
    // }

    pushQueue(config,comment) {

        this.jobQueue.push(function () {
            console.log("pushed");
            return SendMail.sendMail(config,comment);          
        
        });
    
    }

    async workerOn(comment) {

        let q = this.jobQueue;
        let config = this.config;
        let runQueue = this.runQueue;
        // let getQueueStatus = this.getQueueStatus;

        return new Promise<any>( async (resolve, reject) => {
        
            let result;
            let stopFlag = 0;
            
            // do while loop until the 
            do {

                result = await runQueue(q, config, comment);
                
                // if result! = error, job worker is not the  
                if (result != "error") {
                    // add getQueueStatus(q).pending != 0 in the future
                    stopFlag = 1;
                
                } else {

                    resolve(result);
                
                }
                

            } while ( stopFlag == 0 );
        
        });
    
    }

    /**
     * run queue
     * @param path options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    async runQueue(q, config, comment) {

        return new Promise<any>( async (resolve, reject) => {
            
            // start to run the queue
            q.start((err)=> {

                if (err) {
                    // call push job function
                    q.push(function () {
                        console.log("pushed");
                        console.log("sentmail"+comment);
                        return SendMail.sendMail(config, comment);          
                    });

                    // add job worker error
                    reject(err);        
                    
                } else {
                    
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