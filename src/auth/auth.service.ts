import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggedUser } from 'src/users/interfaces/user.intetrface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: string, password: string): Promise<LoggedUser> {
        try {
            const user = await this.usersService.findUser(username)
            if (user && user.password === password) {

                const { password, ...result } = user
                console.log(result)
                return result

            } else return null

        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}