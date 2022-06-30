import { NestMiddleware } from "@nestjs/common";
import { ServerResponse, IncomingMessage } from 'http';

class MiddlemainMiddleware implements NestMiddleware {

    configType: string;

    constructor() {
    
    }
    
    use(req: IncomingMessage, res: ServerResponse, next:any) {

        if(req.url.includes("/api/v1")) {

            if(req.url.replace("/api/v1/i18n/","")!="ch"&&req.url.replace("/api/v1/i18n/","")!="en") {

                res.writeHead(200, { 'content-type': 'application/json' })
                res.write(JSON.stringify({success:false}))
                res.end()                
            
            } else if(req.url!="/api/v1/chinasun/updated_files"&&req.url!="/api/v1/sendmail") {
                
                res.writeHead(200, { 'content-type': 'application/json' })
                res.write({success:false})
                res.end()  
            
            } else {

                res.writeHead(200, { 'content-type': 'application/json' })
                res.write(JSON.stringify(res))
                res.end()  
            
            }
        
        }
        
        next();
      
    }
}

export default MiddlemainMiddleware;