import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';

import { PassportModule } from '@nestjs/passport'; // duda sin el dist
import { UserAccessModule } from 'src/user_access/user_access.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserRole } from 'src/user_role/entities/user_role.entity';
import { RolePerm } from 'src/role_perm/entities/role_perm.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolePermService } from 'src/role_perm/role_perm.service';
import { RolePermModule } from 'src/role_perm/role_perm.module';
import { RolesModule } from 'src/roles/roles.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, RolePerm, Permission, Role]),
    PassportModule, 
    UserAccessModule,
    JwtModule.register({

    signOptions: {expiresIn: '3600s'},
    secret: 'hide-me',
  }), UsersModule, RolePermModule, RolesModule,
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}