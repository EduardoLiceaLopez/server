import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserTypesService } from './user_types.service';
import { UserType } from './entities/user_type.entity';
import { CreateUserTypeInput } from './dto/create-user_type.input';
import { UpdateUserTypeInput } from './dto/update-user_type.input';

@Resolver(() => UserType)
export class UserTypesResolver {
  constructor(private readonly userTypesService: UserTypesService) {}

  @Mutation(() => UserType)
  createUserType(@Args('createUserTypeInput') createUserTypeInput: CreateUserTypeInput) {
    return this.userTypesService.create(createUserTypeInput);
  }

  @Query(() => [UserType], { name: 'userTypes' })
  findAll() {
    return this.userTypesService.findAll();
  }

  @Query(() => UserType, { name: 'userType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userTypesService.findOne(id);
  }
  
  @Mutation(() => UserType)
  updateUserType(@Args('updateUserTypeInput') updateUserTypeInput: UpdateUserTypeInput) {
    return this.userTypesService.updateUserType(updateUserTypeInput.id, updateUserTypeInput);
  }

  @Mutation(() => Boolean)
  removeUserType(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.userTypesService.deleteUserType(id);
  }
  
}
