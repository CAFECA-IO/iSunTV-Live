import { Injectable } from '@nestjs/common';
import queue from 'queue';
import JobWorker from './jobworker.service';

@Injectable()
class SendMailService {
    
    /** @param {any} jobQueue default job queue*/
    jobWorker: any;
    /** @param {any} config default email config*/
    config: any;

    //the class constructor
    /**
     * set the default constructor without param
     */
    constructor() {

    } 

    // sendmail service initialize the job queue and job worker
    /**
     * initialize the SendMailService
     * @param config means email config
     */
    initialze(config) {

        this.config = config;
        // initialize the jobQueue
        this.jobWorker = new JobWorker();

        let jobQueue = queue({ results: [] });
        // initialize the jobWorker
        this.jobWorker.initialize(jobQueue, this.config);

    }

    // sendmail function push the first job to the job queue and wake up the worker to work
    /**
     * initialize the SendMailService
     * @param config means email config
     */
    async sendMail(comment) {

        let config = this.config;
        // push job into queue
        this.jobWorker.pushQueue(config, comment);
        // wake up the worker
        this.jobWorker.workerOn(comment);
        // immediately return sent ok
        return "sent ok";

  }

}

export default SendMailService;