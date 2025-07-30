import { Injectable } from "@nestjs/common";
import { CreateAssignedTaskDto } from "src/assigned-task/dto/create-assigned-task.dto";
import { AssignedTask } from "src/assigned-task/entities/assigned-task.entity";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class AssignedTaskRepository extends Repository<AssignedTask> {
    constructor(private readonly dataSource: DataSource) {
        super(AssignedTask, dataSource.createEntityManager());
    }

    async createAssignedTask(user:User,task:Task) {
        const assignedTask =  this.create({
            user,
            task,
        });
        await this.save(assignedTask);
        return assignedTask;
    }

    async findAssignedTaskByUserId(userId: number) {
        return this.find({
            where: { user: { id: userId } },
            relations: ['user', 'task'],
        });
    }

    async removeAssignedTask(id: number) {
        return this.delete(id);
    }

    async markAsCompleted(assignedTask: AssignedTask) {
        assignedTask.isCompleted = true;
        return this.save(assignedTask);
    }
}