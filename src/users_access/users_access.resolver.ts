import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersAccessService } from './users_access.service';
import { UsersAccess } from './entities/users_access.entity';
import { CreateUsersAccessInput } from './dto/create-users_access.input';
import { UpdateUsersAccessInput } from './dto/update-users_access.input';

@Resolver(() => UsersAccess)
export class UsersAccessResolver {
  constructor(private readonly usersAccessService: UsersAccessService) {}

  @Mutation(() => UsersAccess)
  createUsersAccess(@Args('createUsersAccessInput') createUsersAccessInput: CreateUsersAccessInput) {
    return this.usersAccessService.create(createUsersAccessInput);
  }

  @Query(() => [UsersAccess], { name: 'usersAccess' })
  findAll() {
    return this.usersAccessService.findAll();
  }

  @Query(() => UsersAccess, { name: 'usersAccess' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersAccessService.findOne(id);
  }

  @Mutation(() => UsersAccess)
  updateUsersAccess(@Args('updateUsersAccessInput') updateUsersAccessInput: UpdateUsersAccessInput) {
    return this.usersAccessService.update(updateUsersAccessInput.id, updateUsersAccessInput);
  }

  @Mutation(() => UsersAccess)
  removeUsersAccess(@Args('id', { type: () => Int }) id: number) {
    return this.usersAccessService.remove(id);
  }
}
