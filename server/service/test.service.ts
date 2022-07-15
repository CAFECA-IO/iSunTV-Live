import { Injectable } from '@nestjs/common';


@Injectable()
export class TestService {
  getTest():string{
    return "Test";
  }
}

export default TestService;