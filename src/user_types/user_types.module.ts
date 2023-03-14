import { Module } from '@nestjs/common';
import { UserTypesService } from './user_types.service';
import { UserTypesResolver } from './user_types.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './entities/user_type.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserType, User])],
  providers: [UserTypesResolver, UserTypesService],
  exports: [UserTypesService]
})
export class UserTypesModule {}
