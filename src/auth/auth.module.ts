import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';

import { PassportModule } from '@nestjs/passport/dist'; // duda sin el dist
import { UserAccessModule } from 'src/user_access/user_access.module';

@Module({
  imports: [PassportModule, UserAccessModule],
  providers: [AuthService, AuthResolver, LocalStrategy],
})
export class AuthModule {}
