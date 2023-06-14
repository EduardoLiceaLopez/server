import { CreateRolePermInput } from './create-role_perm.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRolePermInput extends PartialType(CreateRolePermInput) {
  @Field(() => Int)
  role_id: number;

  @Field(() => Int)
  permission_id: number;
}
