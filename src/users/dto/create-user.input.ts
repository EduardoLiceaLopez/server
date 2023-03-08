import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

    @InputType()
    export class CreateUserInput{

    @IsNotEmpty()
    @Field()
    name: string;


    @Field()
    middle_name: string;
    

    @Field({nullable: true})
    last_name?: string;
    

    @Field()
    curp: string;
    

    @Field()
    rfc: string;
    

    @Field((type) => Int)
    phone_number: number;
    

    @Field()
    email: string;


}