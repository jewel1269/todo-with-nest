import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

     async getAllTodos() {
            return this.prisma.todo.findMany();
        }
    
      async create(data: CreateTodoDto) {
         return this.prisma.todo.create({
            data,
         });
      }
}
