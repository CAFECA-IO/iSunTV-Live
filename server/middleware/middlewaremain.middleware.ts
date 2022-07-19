import { NestMiddleware } from "@nestjs/common";
import { ServerResponse, IncomingMessage } from 'http';
import FormatterService  from "server/utils/Formatter.service";
import { ERROR_CODE } from '../utils/ErrorCode';

/**
 * handle the request and response
 * @middleware MiddlemainMiddleware 
 */
class MiddlemainMiddleware implements NestMiddleware {

    configType: string;
    formatter: FormatterService;

    // a function is executed for handling request and response
    //the class constructor
    /**
     * set the default constructor without param
     */
    constructor() {
    
    }
    // a function is executed for handling request and response
    /**
     * @param {IncomingMessage} req store the current req message
     * @param {ServerResponse} res store the server reponse
     * @param {ServerResponse} next is the function that make the route direct to controller 
     */    
    use(req: IncomingMessage, res: ServerResponse, next:any ) {
        
        // didn't use query

        if(req.url.slice(0,4) === "/api") {
            // if api is '/api/v1/i18n/'.. then return i18n realted response
            if(req.url.slice(0,13) === "/api/v1/i18n/") {
            
                if(req.url.replace("/api/v1/i18n/","")!="ch" && req.url.replace("/api/v1/i18n/","")!="en") {
                    
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.write(JSON.stringify(FormatterService.formatData(false,ERROR_CODE.API_NOT_SUPPORT_ERROR,"api not support",{})))
                    res.end();

                } else {
                    // need to add i18n related response
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.write(JSON.stringify(FormatterService.formatData(true,"developing now","0802xxxx",{})))
                    res.end();
                }             
            
            }else if(req.url.slice(0,28) === "/api/v1/chinasun/programlist") {
                // if the prefix = '/api/v1/chinasun/' then call controller and let middleware response the error message;

                    try{
                    
                        next();
                    
                    } catch (e){
                        // hadle the error code and message then format them
                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.write(JSON.stringify(FormatterService.formatData(false,e.code,e.message,{})))
                        res.end();                        
                    
                    }          
            
            } else if(req.url === "/api/v1/sendmail/" || req.url === "/api/v1/sendmail") {
                // handle the path isn't i18n or chinasun
                try{
                    
                    next();
                
                } catch (e) {
                    // hadle the error code and message then format them
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.write(JSON.stringify(FormatterService.formatData(false, e.code, e.message, {})))
                    res.end();                        
                
                }  
            } else {

            }

        } else {
            // 前端 path 但目前尚未設定要使用哪幾個 path
            next();
        
        }
        
      
    }
}

export default MiddlemainMiddleware;