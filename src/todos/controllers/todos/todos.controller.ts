import {
  Body,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { TodoService } from 'src/Services/todo.Service';
import { UpdateTodoDto } from 'src/todos/dto/update-todo-dto';
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

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,

    @Body() updatedTodo: UpdateTodoDto,
  ): Promise<void> {
    await this.todoService.editTodo(id, updatedTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<void> {
    await this.todoService.deleteTodo(id);
  }
}
