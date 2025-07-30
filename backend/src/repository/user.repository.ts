import { Injectable } from "@nestjs/common";
import { SignUpDto } from "src/auth/dto/signup.dto";
import { User } from "src/user/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }


    async findUser() {
        console.log('object');
        return this.find({
            select: {
                name: true,
                email: true
            },


        })
    }
    async createAndSaveUser(userdata: SignUpDto) {
        console.log(userdata)
        const user = this.create(userdata)
        await this.save(user)
        return { user };
    }



    async findUserById(userId: number) {
        const user = await this.findOneBy({ id: userId });
        return user;

    }

}