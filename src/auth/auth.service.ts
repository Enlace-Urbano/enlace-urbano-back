import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggedUser } from 'src/users/interfaces/user.intetrface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<LoggedUser> {
        try {
            const user = await this.usersService.findUser(username)
            if (user && user.password === password) {
                const { password, ...userLogged } = user
                return userLogged

            } return null

        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    async login(user: User) {
        try {
            const validatedUser = await this.validateUser(user.username, user.password)
            const payload = { username: validatedUser.username, id: validatedUser._id }
            console.log(payload)
            const token = this.jwtService.sign(payload)
            // console.log(token)
            return {
                access_token: payload
            }

        } catch (error) {
            throw new UnauthorizedException()
        }

    }
}