
class FormatterService {
    

    
    constructor() {

    }
    
    static formatData(success:boolean,code:string,message:string,payload:any){
        
        let result = { 
            powerby: "iSunTV API v1.0.0",
            success: true,
            code: "00000000",
            message: "Human-readable medium",
            payload: {}
        };       

        result.success = success;
        result.code = code;
        result.message = message;
        result.payload = payload;

        return result;
    }


}

export default FormatterService;