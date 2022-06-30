import { MiddlewareConsumer, Module,NestModule,OnModuleInit,RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import AppController from './app.controller';
import AppService from './app.service';
import MiddlewaremainMiddleware from './middleware/middlewaremain.middleware';
import ApiModule from './module/api.module';

@Module({

  imports: [
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

class AppModule implements NestModule {
  
  // no need to initialize middleware
  middleware : MiddlewaremainMiddleware;

  constructor() {
    // no need to initialize middleware
    this.middleware = new MiddlewaremainMiddleware();
    this.initialize();
  }

  // no need to initialize middleware
  initialize(){
    // don't know the config
    this.middleware.configType = "";
  }
  
  // initialize middlemainmiddleware
  configure(consumer: MiddlewareConsumer) {

    // initialize api module?
    consumer
      .apply(MiddlewaremainMiddleware) 
      .exclude({ path: '/api/v1/chinasun/updated_files', method: RequestMethod.ALL},{ path: '/api/v1/sendmail', method: RequestMethod.ALL})
      .forRoutes({ path: '/*', method: RequestMethod.ALL });    
  
  }

}

export default AppModule;