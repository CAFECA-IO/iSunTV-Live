/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as nodemailer from 'nodemailer';

class SendMail {

    //the class constructor
    /**
     * set the default constructor without param
     */
    constructor() {
        
    }

    /**
     * send email with config
     * @param config options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async sendMail(config, comment) {

        return new Promise<any>( async (resolve, reject) => {

            // create gmail service
            const transporter = nodemailer.createTransport({
            
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                // put config in here (later)
                auth: {
                type: "OAuth2",
                clientId: config.CLIENT_ID,
                clientSecret: config.CLIENT_SECRET,
                }
            
            });

            // create email template
            const MAIL_OPTIONS = {
            
                from    : "clemmy.liao@mermer.cc", // sender address
                to      : "contact@mermer.cc", // list of receivers
                subject : '陽光衛視直播網站意見回覆', // Subject line
                text    : comment, // plaintext body
                html    : '<p>' + comment + '</p>', // html body
        
                auth : {

                    user         : config.USER,
                    refreshToken: config.REFRESH_TOKEN,
                    accessToken:  config.ACCESS_TOKEN
                
                }
        
            };

            // send mail with defined transport object
            transporter.sendMail(MAIL_OPTIONS, function (error, info) {

                if (error) {

                    reject(error);
                
                } else {
                
                    resolve(info.response);
                
                }
        
            });
        
        });

    }  

}

export default SendMail;