import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService) {}
   
    @Get()
    getUsers() {
         return this.userService.getAllUsers()
    }  
   
     
    @Post()
    createUser(@Body() data:createUserDto) {
        return this.userService.create(data)
    }


    @Post()
    createTodo(@Body() data:createUserDto) {
        return this.userService.create(data)
    }

}
