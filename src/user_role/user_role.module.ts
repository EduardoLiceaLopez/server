import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleResolver } from './user_role.resolver';

@Module({
  providers: [UserRoleResolver, UserRoleService]
})
export class UserRoleModule {}
