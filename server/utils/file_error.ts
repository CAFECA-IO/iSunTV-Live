import {CustomError} from 'ts-custom-error';

class FileError extends CustomError {
  public constructor(public code: string, message?: string) {
    super(message);
  }
}

export default FileError;
