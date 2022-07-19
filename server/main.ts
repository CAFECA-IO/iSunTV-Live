import { NestFactory } from '@nestjs/core';
import AppModule  from './app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import http from 'http';
import https from 'https';
import pem from 'pem';

async function bootstrap() {
  
  const SERVER = express();
  
  const app = await NestFactory.create(AppModule, new ExpressAdapter(SERVER));
  app.setGlobalPrefix('api/v1');
  await app.init();
  http.createServer(SERVER).listen(3000);

  pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    if (err) {
      throw err
    }
    https.createServer({ key: keys.serviceKey, cert: keys.certificate }, SERVER).listen(443);
  })

}

bootstrap();
