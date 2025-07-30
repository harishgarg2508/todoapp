import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AssignedTask {

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Task,task=>task.assignedTasks)
    task:Task

    @ManyToOne(()=>User,user=>user.assignedTasks)
    user:User

    @Column({default:false})
    isCompleted:boolean



}
