import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateUserAccessInput {
  @IsNotEmpty()
  @Field()
  user_name: string;

  @Field(()=> Int)
  user_id: number;

  @Field()
  @MinLength(8, {message: 'The password requiered min 8 characters'})
  password: string;
  

  @Field()
  user_role: string;
}
