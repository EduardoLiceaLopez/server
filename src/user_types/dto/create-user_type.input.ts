import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserTypeInput {

  @Field()
  name: string;

}
