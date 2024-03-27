import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TodosController } from "./controllers/todos/todos.controller";

import { User } from "src/users/model/user.model";
import { Todo } from "./models/todo.model";
import { DatabaseModule } from "src/Db/db.module";

@Module({
  controllers: [TodosController],
  imports: [DatabaseModule, SequelizeModule.forFeature([Todo, User])],
})
export class TodosModule {}
