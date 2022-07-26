/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as nodemailer from 'nodemailer';

class SendMail {

    //the class constructor
    /**
     * set the default constructor without param
     */
    constructor() {
     //nothing to do    
    }

    /**
     * send email with config
     * @param config options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */

    static async sendMail(config: { googleClientID: string; googleClientPassword: string; }, comment: string): Promise<any> {

        // create gmail service
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            auth: { // 要用來發信的帳號及密碼，後面可以改用 dotenv 來傳入，進而保護自己的帳密
                user: config.googleClientID,
                pass: config.googleClientPassword
            }           
        
        });

        // create email template
        const mailOptions = {
            from    : config.googleClientID, // sender address
            to      : "contact@mermer.cc", // list of receivers
            subject : '陽光衛視直播網站意見回覆', // Subject line
            text    : comment, // plaintext body
            html    : '<p>' + comment + '</p>', // html body

        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error: any, info: { response: any }) => {

            if (error) {

                throw(error);
            
            } else {
            
                return(info.response);
            
            }
    
        }); 
    }
}

export default SendMail;
