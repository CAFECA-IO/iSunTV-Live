import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { ServerResponse, IncomingMessage } from 'http';
import { FormatterService } from "server/service/formatter.service";
export class MiddlemainMiddleware implements NestMiddleware{

    formatterService: FormatterService;

    constructor(){
        this.formatterService= new FormatterService;
    }
    
    use(req: IncomingMessage, res: ServerResponse, next:any) {
        console.log("here")
        console.log(res)
        

    // //     if(req["params"][0].includes("api")){
    // //         if((req["params"][0]!=="api/chinasun/updated_files")&&(req[0]!=="api/sendmail")){
    // //             res.writeHead(200, { 'content-type': 'application/json' })
    // //             res.write(JSON.stringify(this.formatterService.FormatData(false,"04000001","api not supported",null)))
    // //             res.end()
    // //         }else{
    //             res.writeHead(200, { 'content-type': 'application/json' })
    //             res.write(JSON.stringify(res))
    // //             res.end()
    // //         }
    // //     }else{
    //         // res.write(res)
    //         res.end()
    //     }
        next();
      }
}