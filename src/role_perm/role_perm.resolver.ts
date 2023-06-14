import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import { RolePermService } from './role_perm.service';
import { RolePerm } from './entities/role_perm.entity';
import { CreateRolePermInput } from './dto/create-role_perm.input';
import { UpdateRolePermInput } from './dto/update-role_perm.input';
import { Permission } from 'src/permissions/entities/permission.entity';
import { ConflictException } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';

@Resolver(() => RolePerm)
export class RolePermResolver {
  constructor(private readonly rolePermService: RolePermService) {}

  @Mutation(() => RolePerm)
  createRolePerm(@Args('createRolePermInput') createRolePermInput: CreateRolePermInput) {
    return this.rolePermService.create(createRolePermInput);
  }

  /**
   * 
   * Sección que recupera a las entidades asociadas (Role & Permission)
   */
    //Recupera el usuario asociado
    @ResolveField((returns) => Permission)
    async permission(@Parent() rolePerm: RolePerm): Promise<any>{
      const permission = await this.rolePermService.getPermission(rolePerm.permission_id);
        
      if(!permission){
        throw new ConflictException("Not user for this user_role")
        }
        return permission;
    };
  
    //Recupera el role asociado
    @ResolveField((returns) => Role)
    async role(@Parent() role_perm: RolePerm): Promise<any>{
      const role = await this.rolePermService.getRole(role_perm.role_id);
        
      if(!role){
        throw new ConflictException("Not user for this user_role")
        }
        return role;
    };

  //Fin de la sección de recuperacion

  @Query(() => [RolePerm], { name: 'rolePerms' })
  findAll() {
    return this.rolePermService.findAll();
  }

 /* @Query(() => RolePerm, { name: 'rolePerm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolePermService.findOne(id);
  }

  */
  @Query(() => [RolePerm], { name: 'rolePermByRoles' })
  findOneByRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolePermService.findOneByRoleId(id);
  }

  @Mutation(() => RolePerm)
  updateRolePerm(@Args('updateRolePermInput') updateRolePermInput: UpdateRolePermInput) {
    return this.rolePermService.update(updateRolePermInput.role_id, updateRolePermInput.permission_id, updateRolePermInput);
  }

  @Mutation(() => String)
  removeRolePerm(@Args('role_id', { type: () => Int }) role_id: number, @Args('permission_id') permission_id: number) {
    return this.rolePermService.remove(role_id, permission_id);
  }
}
