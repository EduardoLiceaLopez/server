import { Field, ObjectType } from "@nestjs/graphql";
import { Permission } from "src/permissions/entities/permission.entity";
import { RolePerm } from "src/role_perm/entities/role_perm.entity";
import { Role } from "src/roles/entities/role.entity";
import { UserAccess } from "src/user_access/entities/user_access.entity";

@ObjectType()
export class LoginResponse{

    @Field()
    access_token: string;

    @Field(()=> UserAccess)
    userAccess: UserAccess;

    @Field(()=>[RolePerm], {nullable: true})
    rolePermission?: RolePerm[];
    
}