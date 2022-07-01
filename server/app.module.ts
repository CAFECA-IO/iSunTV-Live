import { MiddlewareConsumer, Module,NestModule,OnModuleInit,RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import AppController from './app.controller';
import AppService from './app.service';
import MiddlewaremainMiddleware from './middleware/middlewaremain.middleware';
import ApiModule from './module/api.module';

// import ConfigModule, ApiModule
@Module({

  imports: [
    // original host Module
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      exclude: ['/api/v1*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService]

})

/**
 * apply middleware
 * @module AppModule
 */
class AppModule implements NestModule {

  //the class constructor
  /**
   * set the default constructor without param
   */
  constructor() {
  
  }

  //the function of getting current time 
  /**
   * @param {MiddlewareConsumer} consumer to import the MiddlewareConsumer in the funciton 
   * return @param {string} result store the current yyyymmdd string
   */
  configure(consumer: MiddlewareConsumer) {

    // apply middlewaremain
    // config exclude route and forRoutes
    consumer
      .apply(MiddlewaremainMiddleware) 
      .forRoutes({ path: '/*', method: RequestMethod.ALL });    
  
  }

}

export default AppModule;