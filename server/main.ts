import { NestFactory } from '@nestjs/core';
import AppModule  from './app.module';

async function bootstrap() {

  // initialize
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

}

bootstrap();
