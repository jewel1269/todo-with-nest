import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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

  @Get("/profile")
    @UseGuards(JwtAuthGuard)
    async getUserById(@Req() req: Request & { user?: { id?: number | string } },  @Res() res: Response) {
      const id = req.user?.id;
      if (!id) {
        throw new BadRequestException('User ID is required');
      }
      try {
        const User = await this.userService.getUserById(Number(id));
        console.log(User)
        return res.status(200).json({
          success: true,
          message: '✅ User fetched successfully',
          data: User,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: '⚠️ Failed to fetch User',
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      }
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
