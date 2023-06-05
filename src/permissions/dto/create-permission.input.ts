import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  action: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  name: string;
}
