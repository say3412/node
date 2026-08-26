import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userService.findByEmail(dto.email);

    if (exists) {
      throw new ConflictException('이미 가입된 이메일 입니다.');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      email: dto.email,
      name: dto.name,
      password: hashed,
      role: dto.role ?? 'BUYER',
    });

    const { password, ...result } = user; // 비민번호를 빼고 나머지 데이터 반환 위함
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비번이 틀려요.');
    }

    const isRight = await bcrypt.compare(dto.password, user.password);

    if (!isRight) {
      throw new UnauthorizedException('이메일 또는 비번이 틀려요.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
