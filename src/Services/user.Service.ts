import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectModel } from "@nestjs/sequelize";

import { hash } from "bcrypt";
import { User } from "src/users/model/user.model";
import { CreateUserDto } from "src/users/userDto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await hash(password, 3); // Hash the password before saving
    await this.userModel.create({ ...userData, password: hashedPassword });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }
}
