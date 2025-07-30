import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

const LIMIT = Number(process.env.PAGINATION_LIMIT) || 10;

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAll() {
    return this.find();
  }
  async createAndSaveUser(userdata: SignUpDto) {
    console.log(userdata);
    const user = this.create(userdata);
    await this.save(user);
    return { user };
  }

  async findAllExcludingLoginUser(
    userId: number,
    search: string,
    page: number = 1,
  ) {
    const query = this.createQueryBuilder('user').where('user.id != :userId', {
      userId,
    });

    if (search) {
      query.andWhere('LOWER(user.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const totalCount = await query.getCount();

    const users = await query
      .select(['user.id', 'user.name', 'user.email'])
      .skip((page - 1) * LIMIT)
      .take(LIMIT)
      .getMany();

    return { users, totalCount };
  }

  async findUserById(userId: number) {
    const user = await this.findOneBy({ id: userId });
    return user;
  }
}
