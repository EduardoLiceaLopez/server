import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RolePerm {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
