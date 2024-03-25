import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoService } from './Services/todo.Service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todos/models/todo.model';
import { User } from './users/model/user.model';
import { TodosController } from './todos/controllers/todos/todos.controller';
import { DatabaseModule } from './Db/db.module';

import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.Service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './users/auth/auth/auth.controller';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Todo, User]),
    JwtModule.register({
      secret: 'MIMI', // Replace with your actual secret key
      signOptions: { expiresIn: '1d' }, // Adjust token expiration as needed
    }),
  ],
  controllers: [AppController, TodosController, AuthController],
  providers: [AppService, TodoService, AuthService, UserService],
})
export class AppModule {}
