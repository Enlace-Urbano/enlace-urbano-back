import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggedUser } from 'src/users/interfaces/user.intetrface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { sign } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<LoggedUser> {
        try {
            const user = await this.usersService.findUser(username)
            if (user && user.password === password) {

                const { password, ...result } = user
                console.log(result)
                return result

            } return null

        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    async login(user: LoggedUser) {
        const payload = { username: user.username, id: user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}