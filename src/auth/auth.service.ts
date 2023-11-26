import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // register

  async register(dto: UserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });

    if (isExist) throw new BadRequestException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: await hash(dto.password),
      },
    });

    const tokens = await this.issueTokens(user.id);

    return { user: { ...user }, ...tokens };
  }

  // login

  async login(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });

    if (!user) throw new UnauthorizedException('Invalid login or password');

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Invalid login or password');

    const tokens = await this.issueTokens(user.id);

    return { user: { ...user }, ...tokens };
  }

  // Создание токенов

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid Refresh Token');

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      ...tokens,
    };
  }

  private async issueTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
