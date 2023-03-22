import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class LoggedUserAccessOutput {

    @Field(()=> String)
    access_token: string;
}