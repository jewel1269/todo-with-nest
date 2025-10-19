import { IsNotEmpty } from "class-validator"


export class CreateTodoDto {
    @IsNotEmpty()
    title: string
    userId: number

}