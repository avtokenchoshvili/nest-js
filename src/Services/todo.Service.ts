import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectModel } from "@nestjs/sequelize";

import { Todo } from "src/todos/models/todo.model";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  public findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }
  public async addTodo(todo: Omit<Todo, "id">): Promise<void> {
    await this.todoModel.create(todo);
  }

  public async deleteTodo(id: number): Promise<void> {
    await this.todoModel.destroy({ where: { id } });
  }

  public async editTodo(id: string, updatedTodo: Partial<Todo>): Promise<void> {
    await this.todoModel.update(updatedTodo, { where: { id } });
  }
}
