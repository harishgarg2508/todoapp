import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingModule } from 'src/hashing/hashing.module';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[HashingModule],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,JwtService],
})
export class AuthModule {}
