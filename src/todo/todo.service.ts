import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodos() {
    return this.prisma.todo.findMany();
  }

  async create(data: CreateTodoDto) {
    if (!data.title || !data.userId) {
      throw new Error('Title and UserId are required');
    }

    return await this.prisma.todo.create({ data });
  }

  async update(id: number, data: CreateTodoDto) {
    try {
      return await this.prisma.todo.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Todo not found');
      }
      throw error;
    }
  }

 
}
