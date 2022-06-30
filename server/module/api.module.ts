import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import * as hound from 'hound';
import ChinasunController from '../controller/chinasun.controller'
import ChinasunService from '../service/chinasun.service';
import SendMailController from '../controller/sendmail.controller';
import SendMailService from '../service/sendmail.service';
import {
    AcceptLanguageResolver,
    I18nModule,
    QueryResolver,
  } from 'nestjs-i18n';
import AppService from 'server/app.service';

// import ConfigModule, I18nModule, Controllers
@Module({

  imports:[
    ConfigModule,
    I18nModule.forRoot({
        fallbackLanguage: 'ch',  
        fallbacks: {
            'en-*': 'en',
            'ch-*': 'ch',
        },
        loaderOptions: {
          path: process.cwd()+'/src/i18n/',
          watch: true,
        },
        resolvers: [
            { use: QueryResolver, options: ['lang'] },
            AcceptLanguageResolver,
        ]     
      }),
  ],
  controllers: [ChinasunController, SendMailController],
  providers: [ChinasunService, SendMailService, AppService]
})

// import ConfigModule, I18nModule, Controllers
/**
 * handle all api
 * @module ApiModule
 */
class ApiModule implements OnModuleInit {

      constructor(private readonly configService: ConfigService) {

      }
      // a function is executed after all controllers are imported 
      /**
       * return @param {string} result store the current yyyymmdd string
       */
      onModuleInit() {
        // register the watcher
        const watcher = hound.watch(process.cwd() + this.configService.get('JSONFILE_DIR'));
     
      }

}

export default ApiModule;