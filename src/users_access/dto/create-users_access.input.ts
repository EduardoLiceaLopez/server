import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsersAccessInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
