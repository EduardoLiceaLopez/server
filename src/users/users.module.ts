import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypesModule } from 'src/user_types/user_types.module';
import { UserAccess } from 'src/user_access/entities/user_access.entity';
import { UserRole } from 'src/user_role/entities/user_role.entity';
import { UserRoleModule } from 'src/user_role/user_role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccess, UserRole]), UserTypesModule, UserRoleModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
