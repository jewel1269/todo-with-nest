import { IsEmail, IsNotEmpty } from "class-validator";

export class createUserDto {
    @IsEmail()
    email: string;
    name: string;
    @IsNotEmpty()
    password: string;  
    
}