import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  id?: number;
  title?: string;
  description?: string;
  completed?: boolean;
}
