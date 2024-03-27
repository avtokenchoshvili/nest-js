import {
  Body,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Delete,
  Put,
} from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { TodoService } from "src/Services/todo.Service";
import { UpdateTodoDto } from "src/todos/dto/update-todo-dto";
import { Todo } from "src/todos/models/todo.model";

@Controller("todos")
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(200)
  public async addTodos(@Body() todo: Omit<Todo, "id">) {
    try {
      await this.todoService.addTodo(todo);
      return "Successfully added";
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Server Error",
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
          error: "Server Error",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(":id")
  async updateTodo(
    @Param("id") id: string,
    @Body() updatedTodo: UpdateTodoDto,
  ): Promise<string> {
    try {
      await this.todoService.editTodo(id, updatedTodo);
      return "Successfully updated";
    } catch (error) {
      throw new HttpException(
        "Failed to update todo",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(":id")
  async deleteTodo(@Param("id") id: number): Promise<string> {
    try {
      await this.todoService.deleteTodo(id);
      return "Successfully deleted";
    } catch (error) {
      throw new HttpException(
        "Failed to delete todo",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
