import { Module } from '@nestjs/common';
import { UserAccessService } from './user_access.service';
import { UserAccessResolver } from './user_access.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccess } from './entities/user_access.entity';

import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/Roles/admin.guard';
import { UserGuard } from 'src/Roles/user.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccess]), UserAccessModule, UsersModule],
  providers: [UserAccessResolver, UserAccessService, AdminGuard, UserGuard], //UserAccessService
  exports: [UserAccessService],
})
export class UserAccessModule {}