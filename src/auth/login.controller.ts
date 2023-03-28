import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@ApiTags('login')
@Controller()
export class LoginController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() user: any) {
        return this.authService.login(user)
    }
}