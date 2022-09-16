import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import ChinasunController from '../controller/chinasun_controller';
import ChinasunService from '../service/chinasun_service';
import SendMailController from '../controller/sendmail_controller';
import SendMailService from '../service/sendmail_service';
import {AcceptLanguageResolver, I18nModule, QueryResolver} from 'nestjs-i18n';
import AppService from 'server/app_service';

// import ConfigModule, I18nModule, Controllers
@Module({
  imports: [
    ConfigModule,
    I18nModule.forRoot({
      fallbackLanguage: 'ch',
      fallbacks: {
        'en-*': 'en',
        'ch-*': 'ch',
      },
      loaderOptions: {
        path: process.cwd() + '/src/i18n/',
        watch: true,
      },
      resolvers: [{use: QueryResolver, options: ['lang']}, AcceptLanguageResolver],
    }),
  ],
  controllers: [ChinasunController, SendMailController],
  providers: [ChinasunService, SendMailService, AppService],
})

// import ConfigModule, I18nModule, Controllers
/**
 * handle all api
 * @module ApiModule
 */
class ApiModule {
  constructor() {
    // nothing to do
  }
}

export default ApiModule;
