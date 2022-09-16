/* eslint-disable import/no-unresolved */
import {Injectable} from '@nestjs/common';
import queue from 'queue';
import JobWorker from './jobworker_service';
import {ERROR_CODE} from '../constant/error_code';
import FormatterService from 'server/utils/formatter_service';

// type definitaion
type apiResponse = {
  powerby: string;
  success: boolean;
  code: string;
  message: string;
  payload: object;
};

type emailConfig = {
  googleClientID: string;
  googleClientPassword: string;
};

@Injectable()
class SendMailService {
  /** @param {any} jobWorker default job worker*/
  jobWorker: JobWorker;
  /** @param {any} config default email config*/
  config: emailConfig;

  //the class constructor
  /**
   * set the default constructor without param
   */
  constructor() {
    // nothing to do
  }

  // sendmail service initialize the job queue and job worker
  /**
   * initialize the SendMailService
   * @param config means email config
   */
  initialze(config: emailConfig) {
    // create job worker
    this.jobWorker = new JobWorker();
    // initialize the jobQueue
    const jobQueue = queue({results: []});

    this.config = config;
    // initialize the jobWorker : put job queue and email config in the job worker
    this.jobWorker.initialize(jobQueue, this.config);
  }

  // sendmail function push the first job to the job queue and wake up the worker to work
  /**
   * initialize the SendMailService
   * @param config means email config
   */
  async sendMail(comment: string): Promise<apiResponse> {
    const config = this.config;
    // push job into queue
    this.jobWorker.pushQueue(config, comment);
    // call the workerOn function in the Job Worker
    this.jobWorker.workerOn(comment);
    // immediately return sent ok (won't wait for the response)
    return FormatterService.formatData(true, ERROR_CODE.SUCCESS, 'sent ok', {});
  }
}

export default SendMailService;
