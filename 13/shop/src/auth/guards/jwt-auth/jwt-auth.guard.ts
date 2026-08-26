import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

// @UseGuard(JwtAuthGuard)
// AuthGuard('jwt') -> JwtStrategy 찾아서 jwt 전략을 돌린다.
// 성공 req.user, 실패 401 UnAuth
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
