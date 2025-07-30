import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as dotenv from 'dotenv';

import * as path from 'path';
import { Task } from 'src/task/entities/task.entity';
import { AssignedTask } from 'src/assigned-task/entities/assigned-task.entity';


dotenv.config();

const rawDataSourceOptions = {
    type: process.env.DATABASE_TYPE as DataSourceOptions['type'],
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    migrationsRun: false, 
    migrationsTableName: 'migrations',
    logging:['query'],
    entities: [User,Task,AssignedTask],
    seeds: ['dist/seeds/**/*.js'],
    migrations: ['dist/migrations/*.js'],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;