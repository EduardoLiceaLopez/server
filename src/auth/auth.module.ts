import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';

import { PassportModule } from '@nestjs/passport'; // duda sin el dist
import { UserAccessModule } from 'src/user_access/user_access.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    PassportModule, 
    UserAccessModule,
    JwtModule.register({

    signOptions: {expiresIn: '3600s'},
    secret: 'hide-me',
  }), 
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}