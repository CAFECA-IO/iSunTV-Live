import { Injectable } from '@nestjs/common';
import SendMail from 'server/utils/SendMail';
import queue from 'queue';
import JobWorker from 'server/utils/JobWorker';

@Injectable()
class SendMailService {

    constructor() {
  
    } 

    async sendMail() {
        // initialize a queue
        var q = queue({ results: [] })
        // push job into queue
        
        q.push(function () {
            return SendMail.sendMail({ user:"", clientID:"", clientSecret:"", refreshToken:"", accessToken:"" });
          })
        // pass q to Job Worker
        const result = await JobWorker.runQueue(q);
        return "sent ok";
  }
}

export default SendMailService;