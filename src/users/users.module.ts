import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypesModule } from 'src/user_types/user_types.module';
import { UserAccess } from 'src/user_access/entities/user_access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccess]), UserTypesModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
