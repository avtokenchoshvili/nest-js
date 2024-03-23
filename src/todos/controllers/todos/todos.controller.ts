import { Body, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { TodoService } from 'src/Services/todo.Service';
import { Todo } from 'src/todos/models/todo.model';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(200)
  public async addTodos(@Body() todo: Omit<Todo, 'id'>) {
    try {
      await this.todoService.addTodo(todo);
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public getTodos() {
    try {
      return this.todoService.findAll();
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
