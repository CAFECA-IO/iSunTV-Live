import { NestFactory } from '@nestjs/core';
import AppModule  from './app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import http from 'http';
import https from 'https';
import pem from 'pem';
import { ConfigService } from '@nestjs/config';
// 
async function bootstrap() {
  
  const SERVER = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(SERVER));
  app.setGlobalPrefix('api/v1');
  await app.init();

  const configService = app.get(ConfigService);
  const HTTPS_ENABLE = configService.get('HTTPS_ENABLE');

  if (HTTPS_ENABLE == "true") {

    http.createServer(SERVER).listen(3000);
  
    pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
      if (err) {
        throw err
      }
      https.createServer({ key: keys.serviceKey, cert: keys.certificate }, SERVER).listen(443);
    })

  } else {

    http.createServer(SERVER).listen(3000);

  }

}

bootstrap();
