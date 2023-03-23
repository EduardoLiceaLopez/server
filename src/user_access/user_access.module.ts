import { Module } from '@nestjs/common';
import { UserAccessService } from './user_access.service';
import { UserAccessResolver } from './user_access.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccess } from './entities/user_access.entity';
import { User } from 'src/users/user.entity';
import { UsersAccessService } from 'src/users_access/users_access.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersAccessModule } from 'src/users_access/users_access.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccess]), UserAccessModule, UsersModule],
  providers: [UserAccessResolver, UserAccessService],
  exports: [UserAccessService],
})
export class UserAccessModule {}