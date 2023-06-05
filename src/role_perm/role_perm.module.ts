import { Module } from '@nestjs/common';
import { RolePermService } from './role_perm.service';
import { RolePermResolver } from './role_perm.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePerm } from './entities/role_perm.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolePerm, Role, Permission]), RolesModule, PermissionsModule],
  providers: [RolePermResolver, RolePermService]
})
export class RolePermModule {}
