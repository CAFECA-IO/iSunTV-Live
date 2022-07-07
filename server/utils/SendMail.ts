import { ConfigModule } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ERROR_CODE } from './ErrorCode';

class SendMail {

    constructor() {

    }

    /**
     * send email with config
     * @param config options to start the function with
     * @returns a promise resolved result when the function is ready to be called
     */
    static async sendMail(config) {
        
        return new Promise<any>( async (resolve, reject) => {

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
        
            let mailOptions = {
            
                from    : "clemmy.liao@mermer.cc", // sender address
                to      : "clemmy.liao@mermer.cc", // list of receivers
                subject : '陽光衛視直播網站意見回覆', // Subject line
                text    : 'Comments', // plaintext body
                html    : '<b>Comments</b>', // html body
        
                auth : {
                    user         : config.USER,
                    refreshToken: config.REFRESH_TOKEN,
                    accessToken:  config.ACCESS_TOKEN
                }
        
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {

                if (error) {
                    reject(error);
                }
        
                resolve(info.response);
        
            });
        
        });

    }  

}

export default SendMail;