import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { GoogleRegisterDto } from 'src/modules/auth/dto/google-register.dto';
import { LoginUserDto } from 'src/modules/auth/dto/login-user.dto';
import { RegisterCredentialUserDto } from 'src/modules/auth/dto/register-credential-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerCredential(dto: RegisterCredentialUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashPassword = await argon2.hash(dto.password);

    let parsedDate: Date | null;
    if (parsedDate) {
      new Date(dto.dateOfBirth).toISOString();
    } else {
      parsedDate = null;
    }

    return this.prisma.user.create({
      data: { ...dto, password: hashPassword, dateOfBirth: parsedDate },
    });
  }

  async googleAuth(
    dto: GoogleRegisterDto,
  ): Promise<{ user: User; accessToken: string }> {
    let user = await this.prisma.user.findFirst({
      where: { googleId: dto.googleId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: dto,
      });
    }

    const accessToken = jwt.sign(
      { sub: user.id, username: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    return { user, accessToken };
  }

  async loginCredential(
    dto: LoginUserDto,
  ): Promise<{ user: User; accessToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await argon2.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { sub: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    return { user, accessToken };
  }
}
