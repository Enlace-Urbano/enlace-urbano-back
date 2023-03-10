import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class LoginController {

    constructor(private authService: AuthService) { }
    @Post('auth/login')
    async login(@Body() user: any) {
        return this.authService.validateUser(user.username, user.password)
    }
}