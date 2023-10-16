import { Get, Controller } from '@nestjs/common'
import { Public } from './auth/public/public.decorator'

@Controller()
export class AppController {
  @Public()
  @Get()
  helloWorld() {
    return {
      success: true,
      info: 'hello World',
    }
  }
}
