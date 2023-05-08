import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';


@InputType()
export class CreateUserAccessInput {

  @IsNotEmpty()
  @Field(()=> Int)
  user_id: number;

  @IsNotEmpty()
  @Field()
  user_name: string;

  @Field()
 // @MinLength(8, {message: 'The password requiered min 8 characters'})
  password: string;
  

  @Field()
  user_role: string;
}
