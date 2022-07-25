import { CustomError } from 'ts-custom-error';
 
class DateError extends CustomError {
    
    public constructor(
        public code: string,
        message?: string,
    ) {
        super(message)
    }

}

export default DateError;