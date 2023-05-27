import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'JuanCarlos' },
        password: { type: 'string', example: 'Cl@ve2' },
      },
    },
  })
  @Post('auth/login')
  async login(@Body() user: any) {
    console.log(user);
    return this.authService.login(user);
  }
}
