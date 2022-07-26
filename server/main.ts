import { NestFactory } from '@nestjs/core';
import AppModule  from './app_module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import http from 'http';
import https from 'https';
import pem from 'pem';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);
  const httpsEnable = configService.get('HTTPS_ENABLE');
  const httpEnable = configService.get('HTTP_ENABLE');
  const httpPort = configService.get('HTTP_PORT');
  const httpsPort = configService.get('HTTPS_PORT');


  if (httpsEnable == "true") {
  
    pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
      if (err) {
        throw err
      }
      https.createServer({ key: keys.serviceKey, cert: keys.certificate }, server).listen(parseInt(httpsPort));
    })

  } 
  
  if (httpEnable == "true") {

    http.createServer(server).listen(parseInt(httpPort));

  }
  await app.init();

}

bootstrap();
