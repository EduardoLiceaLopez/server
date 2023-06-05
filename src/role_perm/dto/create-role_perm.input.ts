import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRolePermInput {

  @Field(() => Int)
  permission_id: number;

  @Field(() => Int)
  role_id: number;

  @Field(()=> Boolean)
  active: boolean;
}
