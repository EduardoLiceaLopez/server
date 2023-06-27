import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleResolver } from './user_role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/users/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User, Role]), RolesModule],
  providers: [UserRoleResolver, UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
