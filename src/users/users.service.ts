import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createUserDto } from './dto/update-user.dto';
import { generateToken } from 'src/config/jwt.config';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async create(data: createUserDto) {
    try {
      const user = await this.prisma.user.create({ data });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async login(data: createUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      const matchPassword = user?.password === data.password;
      if (!user || !matchPassword) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = { id: user.id, email: user.email };
      const token = generateToken(payload);

      return { user, token };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  
}
