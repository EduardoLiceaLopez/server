import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from 'src/user_role/entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  providers: [RolesResolver, RolesService]
})
export class RolesModule {}
