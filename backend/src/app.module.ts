import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AssignedTaskModule } from './assigned-task/assigned-task.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/datasource';

@Module({
  imports: [TaskModule, UserModule, AssignedTaskModule, AuthModule,TypeOrmModule.forRoot(dataSourceOptions),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
