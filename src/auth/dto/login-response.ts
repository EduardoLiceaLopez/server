import { Field, ObjectType } from "@nestjs/graphql";
import { Permission } from "src/permissions/entities/permission.entity";
import { UserAccess } from "src/user_access/entities/user_access.entity";

@ObjectType()
export class LoginResponse{

    @Field()
    access_token: string;

    @Field(()=> UserAccess)
    userAccess: UserAccess;

    
}