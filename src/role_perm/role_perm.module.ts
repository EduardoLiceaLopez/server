import { Module } from '@nestjs/common';
import { RolePermService } from './role_perm.service';
import { RolePermResolver } from './role_perm.resolver';

@Module({
  providers: [RolePermResolver, RolePermService]
})
export class RolePermModule {}
