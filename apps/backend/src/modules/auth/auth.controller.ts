import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from 'src/modules/auth/auth.service';
import { GoogleRegisterDto } from 'src/modules/auth/dto/google-register.dto';
import { LoginUserDto } from 'src/modules/auth/dto/login-user.dto';
import { RegisterCredentialUserDto } from 'src/modules/auth/dto/register-credential-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  async register(@Body() dto: RegisterCredentialUserDto): Promise<User> {
    try {
      return this.authService.registerCredential(dto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post('google-auth')
  @ApiOperation({ summary: 'Register user with google' })
  async googleAuth(
    @Body() dto: GoogleRegisterDto,
  ): Promise<{ user: User; accessToken: string }> {
    try {
      return this.authService.googleAuth(dto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(
    @Body() dto: LoginUserDto,
  ): Promise<{ user: User; accessToken: string }> {
    try {
      return this.authService.loginCredential(dto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
