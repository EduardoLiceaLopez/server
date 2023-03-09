import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypesModule } from 'src/user_types/user_types.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserTypesModule],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
