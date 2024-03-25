import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { UserService } from './user.Service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/userDto/create-user.dto';
import { User } from 'src/users/model/user.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // Create a new user with the hashed password
    await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    const payload = { email: this.userService.findUserByEmail };
    const accessToken = this.jwtService.sign(payload);
    return { message: 'User registered successfully', accessToken };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // Find the user by email
    const user: User = await this.userService.findUserByEmail(email);
    if (!user) {
      // Handle invalid email
      throw new Error('Invalid credentials');
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Handle incorrect password
      throw new Error('Invalid credentials');
    }

    // Generate JWT token if authentication is successful
    const payload = { email: user.email }; // Customize payload as needed
    const accessToken = this.jwtService.sign(payload);
    console.log('JWT token:', accessToken);
    return { accessToken };
  }
}
