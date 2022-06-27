import { MiddlewareConsumer, Module,NestModule, RequestMethod } from '@nestjs/common';
import {ChinasunController} from '../controller/chinasun.controller'
import { ChinasunService } from '../service/chinasun.service';
import { SendMailController } from '../controller/sendmail.controller';
import { SendMailService } from '../service/sendmail.service';
import { MiddlemainMiddleware } from 'server/middleware/middlemain.middleware';
import {
    AcceptLanguageResolver,
    I18nModule,
    QueryResolver,
  } from 'nestjs-i18n';
import { I18nController } from 'server/controller/i18n.controller';

@Module({
  imports:[
    //import i18n module
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
          ]     }),
  ],
  controllers: [I18nController, ChinasunController, SendMailController],
  providers: [ChinasunService, SendMailService]
})

export class ApiModule implements NestModule{
    // find a way to specify route
    constructor(){
    }
    
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(MiddlemainMiddleware) 
            .exclude({ path: '/api/v1/chinasun/updated_files', method: RequestMethod.ALL},{ path: '/api/v1/sendmail', method: RequestMethod.ALL})
            .forRoutes({ path: '/*', method: RequestMethod.ALL });    
    }
}