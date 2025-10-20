import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get("/")
  async getAllTodos(@Res() res: Response) {
    try {
      const todos = await this.todoService.getAllTodos();
      return res.status(200).json({
        success: true,
        message: '✅ Todos fetched successfully',
        data: todos,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: '⚠️ Failed to fetch todos',
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }





  @Post("/create")
  async createTodo(@Body() data: CreateTodoDto, @Res() res: Response) {
    try {
      const todo = await this.todoService.create(data);
      return res.status(201).json({
        success: true,
        message: '✅ Todo created successfully',
        data: todo,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: '⚠️ Failed to create todo',
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() data: CreateTodoDto,
    @Res() res: Response,
  ) {
    if (!id) {
      throw new BadRequestException('Todo ID is required');
    }

    try {
      const updated = await this.todoService.update(Number(id), data);
      return res.status(200).json({
        success: true,
        message: '✅ Todo updated successfully',
        data: updated,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: '⚠️ Failed to update todo',
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }
}

