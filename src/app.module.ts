import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoService } from './Services/todo.Service';

import { UsersController } from './users/controllers/users/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todos/models/todo.model';
import { User } from './users/model/user.model';
import { TodosController } from './todos/controllers/todos/todos.controller';
import { DatabaseModule } from './Db/db.module';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([Todo, User])],
  controllers: [AppController, UsersController, TodosController],
  providers: [AppService, TodoService],
})
export class AppModule {}
