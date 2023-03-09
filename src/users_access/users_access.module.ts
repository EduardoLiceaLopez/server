import { Module } from '@nestjs/common';
import { UsersAccessService } from './users_access.service';
import { UsersAccessResolver } from './users_access.resolver';

@Module({
  providers: [UsersAccessResolver, UsersAccessService]
})
export class UsersAccessModule {}
