import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserInput{
    @Field()
    user_name: string;

    @Field()
    password: string;
}