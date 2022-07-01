import { NestMiddleware } from "@nestjs/common";
import { ServerResponse, IncomingMessage } from 'http';
import FormatterService  from "server/utils/Formatter.service";

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

        if(req.url.slice(0,4) == "/api") {
            // if api is '/api/v1/i18n/'.. then return i18n realted response
            if(req.url.slice(0,13)=='/api/v1/i18n/') {
            
                if(req.url.replace("/api/v1/i18n/","")!="ch" && req.url.replace("/api/v1/i18n/","")!="en") {
                    
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.write(JSON.stringify(FormatterService.formatData(false,"api not supported","08020001",{})))
                    res.end();

                } else {
                    // need to add i18n related response
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.write(JSON.stringify(FormatterService.formatData(true,"developing now","0802xxxx",{})))
                    res.end();
                }             
            
            }else if(req.url.slice(0,17) == '/api/v1/chinasun/') {
                // if the prefix = '/api/v1/chinasun/' then call controller and let middleware response the error message;
                if(req.url!="/api/v1/chinasun/programlist") {
                
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.write(JSON.stringify(FormatterService.formatData(false,"api not supported","08020001",{})))
                    res.end();
            
                } else {

                    try{
                    
                        next();
                    
                    } catch (e){
                        // hadle the error code and message then format them
                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.write(JSON.stringify(FormatterService.formatData(false,e.code,e.message,{})))
                        res.end();                        
                    
                    }          
                
                }
            
            } else {
                // handle the path isn't i18n or chinasun
                res.writeHead(200, { 'content-type': 'application/json' });
                res.write(JSON.stringify(FormatterService.formatData(false,"api not supported","08020001",{})))
                res.end();
            }

        } else {
            // 前端 path 但目前尚未設定要使用哪幾個 path
            next();
        
        }
        
      
    }
}

export default MiddlemainMiddleware;