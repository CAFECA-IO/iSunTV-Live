import { Injectable } from '@nestjs/common';
import queue from 'queue';
import JobWorker from './jobworker.service';

@Injectable()
class SendMailService {
    
    config: any;
    jobWorker: any;

    constructor() {
        this.jobWorker = new JobWorker();
    } 

    // sendmail service initialize the job queue
    initialze(config) {

        this.config = config;
        let jobQueue = queue({ results: [] });
        this.jobWorker.initialize(jobQueue, this.config);

    }

    async sendMail(comment) {
        // initialize a queue
        // push job into queue
        let config = this.config;
        this.jobWorker.pushQueue(config, comment);
        this.jobWorker.workerOn(comment);
        // // pass q to Job Worker
        return "sent ok";

  }
}

export default SendMailService;