import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
//this service is used to format the json type
export class FormatterService {
    
    jsonFormat: any;
    
    constructor(){
        this.jsonFormat={powerby: "iSunTV API v1.0.0",
        success: true,
        code: "00000000",
        message: "Human-readable medium",
        payload: {}};
    }
    
    FormatData(success:boolean,code:string,message:string,payload:JSON):JSON{
        
        this.jsonFormat.success=success;
        this.jsonFormat.code=code;
        this.jsonFormat.message=message;
        this.jsonFormat.payload=payload;

        return this.jsonFormat;
    }


}
