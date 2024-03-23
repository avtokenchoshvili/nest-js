import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'nodeLearning',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
