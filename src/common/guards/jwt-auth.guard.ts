import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}