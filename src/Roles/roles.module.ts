import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from 'src/user_role/entities/user_role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole, Permission])],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
