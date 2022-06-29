import { Module,OnModuleInit } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import AppController from './app.controller';
import AppService from './app.service';
import ApiModule from './module/api.module';

// 處理 Cookie + i18n
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      exclude: ['/api/v1*'],
    }),
    //use i18n (try)
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements OnModuleInit {
  constructor(private appService: AppService) {
  }

  onModuleInit() {
    console.log(`Watch the updates`);
    this.appService.dostuff();
  }
}