import { User } from './../../generated/prisma/index.d';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

  async create(data: createUserDto) {
     return this.prisma.user.create({
        data,
     });
  }
}
