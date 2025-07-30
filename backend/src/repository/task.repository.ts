import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entities/task.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private readonly dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(createTaskDto: CreateTaskDto){
        const task = this.create(createTaskDto);
         await this.save(task);
         return task;
    }

    async findTasksByUserId(userId: number) {
        return this.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: ['assignedTasks', 'assignedTasks.user']
        });
    }

    
}