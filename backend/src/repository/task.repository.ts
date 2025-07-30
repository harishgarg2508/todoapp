import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

const LIMIT = Number(process.env.PAGINATION_LIMIT) || 10;

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto, user:User) {

    const task = this.create({ ...createTaskDto, user });
    await this.save(task);
    return task;
  }

  async findTasksByUserId(userId: number) {
    return this.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['assignedTasks', 'assignedTasks.user'],
    });
  }

  async getAllTasks(
    userId: number,
    filters: any,
    page: number,
  ): Promise<{ tasks: Task[]; totalCount: number }> {
    const queryBuilder = this.createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'creator') 
      .leftJoinAndSelect('task.assignedTasks', 'assignedTask')
      .leftJoinAndSelect('assignedTask.user', 'assignee'); 

    
    if (filters.creatorId) {
      queryBuilder.andWhere('creator.id = :creatorId', {
        creatorId: filters.creatorId,
      });
    }

    if (filters.assigneeId) {
      queryBuilder.andWhere('assignee.id = :assigneeId', {
        assigneeId: filters.assigneeId,
      });
    }

    if (filters.startTime && filters.endTime) {
      queryBuilder.andWhere(
        'task.startTime >= :startTime AND task.endTime <= :endTime',
        {
          startTime: filters.startTime,
          endTime: filters.endTime,
        },
      );
    } else if (filters.startTime) {
      queryBuilder.andWhere('task.startTime >= :startTime', {
        startTime: filters.startTime,
      });
    } else if (filters.endTime) {
      queryBuilder.andWhere('task.endTime <= :endTime', {
        endTime: filters.endTime,
      });
    }

    if (filters.search) {
      queryBuilder.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${filters.search}%`,
        },
      );
    }

    queryBuilder.andWhere('(creator.id = :userId OR assignee.id = :userId)', {
      userId,
    });

    const totalCount = await queryBuilder.getCount();

    const tasks = await queryBuilder
      .skip((page - 1) * LIMIT)
      .take(LIMIT)
      .getMany();

    return { tasks, totalCount };
  }
}
