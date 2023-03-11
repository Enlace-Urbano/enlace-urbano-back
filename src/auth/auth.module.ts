import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LoginController } from './login.controller';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'palabra secreta',
            signOptions: { expiresIn: '24h' },
        }),
        UsersModule,
    ],
    controllers: [LoginController],
    providers: [JwtService, AuthService],
    exports: [AuthService]
})
export class AuthModule { }
