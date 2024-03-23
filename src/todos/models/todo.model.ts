import { Column, Table, DataType, Model } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  todo: string;
}
