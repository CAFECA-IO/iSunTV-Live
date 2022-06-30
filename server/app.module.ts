import { MiddlewareConsumer, Module,NestModule,OnModuleInit,RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import AppController from './app.controller';
import AppService from './app.service';
import { MiddlemainMiddleware } from './middleware/middlemain.middleware';
import ApiModule from './module/api.module';
// 處理 Cookie + i18n
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      exclude: ['/api/v1*'],
    }),
    //use i18n (try)
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  
  constructor() {

  }

  // // initialize the middleware
  // initialize = () => {
  //   this.mainmiddleware.configType="";
  // }
  
  // no need to initialize middleware

  
  // initialize middlemainmiddleware
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(MiddlemainMiddleware) 
    .exclude({ path: '/api/v1/chinasun/updated_files', method: RequestMethod.ALL},{ path: '/api/v1/sendmail', method: RequestMethod.ALL})
    .forRoutes({ path: '/*', method: RequestMethod.ALL });    
  }
}