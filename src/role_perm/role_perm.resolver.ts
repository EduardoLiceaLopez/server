import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolePermService } from './role_perm.service';
import { RolePerm } from './entities/role_perm.entity';
import { CreateRolePermInput } from './dto/create-role_perm.input';
import { UpdateRolePermInput } from './dto/update-role_perm.input';

@Resolver(() => RolePerm)
export class RolePermResolver {
  constructor(private readonly rolePermService: RolePermService) {}

  @Mutation(() => RolePerm)
  createRolePerm(@Args('createRolePermInput') createRolePermInput: CreateRolePermInput) {
    return this.rolePermService.create(createRolePermInput);
  }

  @Query(() => [RolePerm], { name: 'rolePerm' })
  findAll() {
    return this.rolePermService.findAll();
  }

  @Query(() => RolePerm, { name: 'rolePerm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolePermService.findOne(id);
  }

  @Mutation(() => RolePerm)
  updateRolePerm(@Args('updateRolePermInput') updateRolePermInput: UpdateRolePermInput) {
    return this.rolePermService.update(updateRolePermInput.id, updateRolePermInput);
  }

  @Mutation(() => RolePerm)
  removeRolePerm(@Args('id', { type: () => Int }) id: number) {
    return this.rolePermService.remove(id);
  }
}
