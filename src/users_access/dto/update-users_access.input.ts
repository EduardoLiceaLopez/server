import { CreateUsersAccessInput } from './create-users_access.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersAccessInput extends PartialType(CreateUsersAccessInput) {
  @Field(() => Int)
  id: number;
}
