import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    const authHeader = request.headers['authorization'];
    let token = authHeader?.split(' ')[1];
    
    if (!token && request.cookies) {
      token = request.cookies['token'];
    }

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request['user'] = decoded;
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}