// type definitaion
type apiResponse = { 
    powerby: string;
    success: boolean;
    code: string;
    message: string;
    payload: object;
};

class FormatterService {
    
    constructor() {
        // nothing to do
    }
    /**
     * format the response data with normalization format
     * @param success req is successful or not
     * @param code response message code
     * @param message reponse message
     * @param payload reponse data
     * @returns a promise resolved result when the function is ready to be called
     */   
    static formatData(success:boolean, code:string, message:string, payload:object): apiResponse{
        
        const result = { 
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