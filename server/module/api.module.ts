import { MiddlewareConsumer, Module,NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
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
import { I18nController } from 'server/controller/i18n.controller';
import AppService from 'server/app.service';

@Module({
  imports:[
    //import i18n module
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
  controllers: [I18nController, ChinasunController, SendMailController],
  providers: [ChinasunService, SendMailService, AppService]
})

class ApiModule implements OnModuleInit{
    // find a way to specify route

    
    // export class AppModule implements OnModuleInit {
      constructor(private appService: AppService) {
      }
    
      onModuleInit() {
        console.log(`Watch the updates`);
        this.appService.dostuff();
      }
    // }
}

export default ApiModule;