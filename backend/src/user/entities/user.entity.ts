import { AssignedTask } from "src/assigned-task/entities/assigned-task.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @OneToMany(()=>Task,task=>task.user)
    tasks:Task[]

    @OneToMany(()=>AssignedTask,assignedTask=>assignedTask.user)
    assignedTasks:AssignedTask[]

}
