import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "../user.entity";

    @InputType()
    export class CreateUserInput{

    @IsNotEmpty()
    @Field()
    name: string;

    @Field()
    middle_name: string;
    
    @Field({nullable: true})
    last_name?: string;

    @MaxLength(18, {message: 'El CURP se conforma máximo 18 carcateres'})
    @MinLength(18, {message: 'EL CURP se conforma por mínimo 18 caracteres'})
    @Field()
    curp: string;

    @MinLength(13, {message: 'El RFC se conforma mínimmo de 13 carcateres'})
    @MaxLength(13, {message: 'El RFC se conforma máximo 13 carcateres'})
    @Field()
    rfc: string;
    
    @Field()
    phone_number: string;
    
    @Field()
    email: string;


    @Field((type) => Int)
    user_type_id: number;

}

