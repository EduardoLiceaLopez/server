import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField} from '@nestjs/graphql';
import { UserRoleService } from './user_role.service';
import { UserRole } from './entities/user_role.entity';
import { CreateUserRoleInput } from './dto/create-user_role.input';
import { UpdateUserRoleInput } from './dto/update-user_role.input';
import { User } from 'src/users/user.entity';
import { ConflictException } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';

@Resolver(() => UserRole)
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Mutation(() => UserRole)
  createUserRole(@Args('createUserRoleInput') createUserRoleInput: CreateUserRoleInput) {
    return this.userRoleService.create(createUserRoleInput);
  }

  //Recupera el usuario asociado
  @ResolveField((returns) => User)
  async  user(@Parent() userRole: UserRole): Promise<any>{
    const user = await this.userRoleService.getUser(userRole.user_id);
      
    if(!user){
      throw new ConflictException("Not user for this user_role")
      }
      return user;
  };

  //Recupera el role asociado
  @ResolveField((returns) => Role)
  async role(@Parent() userRole: UserRole): Promise<any>{
    const role = await this.userRoleService.getRole(userRole.role_id);
      
    if(!role){
      throw new ConflictException("Not user for this user_role")
      }
      return role;
  };

  //Fin de las asociaciones


  @Query(() => [UserRole], { name: 'userRoles' })
  findAll() {
    return this.userRoleService.findAll();
  }

  @Query(() => UserRole, { name: 'userRole' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userRoleService.findOne(id);
  }

  @Mutation(() => UserRole)
  updateUserRole(@Args('updateUserRoleInput') updateUserRoleInput: UpdateUserRoleInput) {
    return this.userRoleService.update(updateUserRoleInput.id, updateUserRoleInput);
  }

  @Mutation(() => UserRole)
  removeUserRole(@Args('id', { type: () => Int }) id: number) {
    return this.userRoleService.remove(id);
  }
}
