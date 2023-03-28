import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggedUser } from 'src/users/interfaces/user.intetrface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/schemas/user.schema';
import { EncryptService } from 'src/tools/encrypt.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private encryptService: EncryptService
    ) { }

    async validateUser(username: string, userPassword: string): Promise<LoggedUser> {
        try {
            const user = await this.usersService.findUser(username)
            if (user) {
                const isPassword = await this.encryptService.compare(userPassword, user.password)

                if (isPassword) {
                    const { password, ...userLogged } = user
                    return userLogged
                }

            } return null

        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    async login(user: User) {
        try {
            const validatedUser = await this.validateUser(user.username, user.password)
            const payload = { username: validatedUser.username, sub: validatedUser._id }
            const token = this.jwtService.sign(payload)
            return {
                access_token: token
            }

        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}