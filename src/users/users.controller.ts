import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/update-user.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return {
      success: true,
      message: '✅ Users fetched successfully',
      data: users,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  async createUser(@Body() data: createUserDto) {
    const user = await this.userService.create(data);
    return {
      success: true,
      message: '✅ User created successfully',
      data: user,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('/login')
  async loginUser(
    @Body() data: createUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.userService.login(data);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      message: '✅ User logged in successfully',
      data: user,
      timestamp: new Date().toISOString(),
    };
  }
}
