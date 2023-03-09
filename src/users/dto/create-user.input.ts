import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

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
    @MinLength(18, {message: 'EL CURP se conforma por mámixo 18 caracteres'})
    @Field()
    curp: string;

    @MinLength(13, {message: 'El RFC se conforma máximo de 13 carcateres'})
    @MaxLength(13, {message: 'El RFC se conforma máximo 13 carcateres'})
    @Field()
    rfc: string;
    
    @Field((type) => Int)
    phone_number: number;
    
    @Field()
    email: string;

}