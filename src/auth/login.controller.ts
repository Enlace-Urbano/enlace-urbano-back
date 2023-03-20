import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags('login')
@Controller()
export class LoginController {

    constructor(private authService: AuthService) { }
    @Post('auth/login')
    async login(@Body() user: any) {
        return this.authService.login(user)
    }
}