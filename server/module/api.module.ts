import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ChinasunController from '../controller/chinasun.controller'
import ChinasunService from '../service/chinasun.service';
import { SendMailController } from '../controller/sendmail.controller';
import { SendMailService } from '../service/sendmail.service';
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

// regsiter the watch event
class ApiModule implements OnModuleInit {

      constructor() {

      }
    
      onModuleInit() {

        
      }

}

export default ApiModule;