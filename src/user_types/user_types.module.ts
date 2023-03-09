import { Module } from '@nestjs/common';
import { UserTypesService } from './user_types.service';
import { UserTypesResolver } from './user_types.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './entities/user_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserType])],
  providers: [UserTypesResolver, UserTypesService]
})
export class UserTypesModule {}
