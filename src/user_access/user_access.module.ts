import { Module } from '@nestjs/common';
import { UserAccessService } from './user_access.service';
import { UserAccessResolver } from './user_access.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccess } from './entities/user_access.entity';
import { User } from 'src/users/user.entity';
import { UsersAccessService } from 'src/users_access/users_access.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccess, User]), UserAccessModule],
  providers: [UserAccessResolver, UserAccessService],
  exports: [UsersAccessService]
})
export class UserAccessModule {}