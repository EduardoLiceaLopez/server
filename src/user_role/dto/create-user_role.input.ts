import { InputType, Int, Field } from '@nestjs/graphql';
import { In } from 'typeorm';

@InputType()
export class CreateUserRoleInput {

  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  role_id: number;
}
