import { Controller, Get ,Param} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
    
@Controller('i18n')

export class I18nController {    

    constructor(){
    }
    
    // return all data with certain language
    @Get('/:lang')
        async getIndex(@I18n() i18n: I18nContext, @Param('lang') lang: string): Promise<object> {
            const Line1 = await i18n.translate('test.HELLO', {lang});
            return {
                data: {
                    line1: Line1
                }
            }
        }
    
    }