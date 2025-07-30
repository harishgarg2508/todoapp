import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AssignedTask {

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Task,task=>task.assignedTasks,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'taskId' })
    task:Task

    @ManyToOne(()=>User,user=>user.assignedTasks,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId' }) 
    user:User

    @Column({default:false})
    isCompleted:boolean



}
