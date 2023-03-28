import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@ApiTags('login')
@Controller()
export class LoginController {

    constructor(private authService: AuthService) { }

    @Get('auth/login')
    async hello() {
        return 'hello'
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() user: any) {
        console.log(user)
        return this.authService.login(user)
    }
}