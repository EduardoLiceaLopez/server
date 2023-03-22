import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserAccessInput{
    @Field(()=> String)
    user_name: string;

    @Field(()=> String)
    password: string;
}