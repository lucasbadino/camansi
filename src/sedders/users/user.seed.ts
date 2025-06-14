import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { userData } from "../data";


@Injectable()
export class UserSeed {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UsersService,
    ) { }
    
    async seedUsers(): Promise<void> {
        const data = userData as CreateUserDto[];
        for (const user of data) {
            const existingUser = await this.userRepository.findOneBy({ email: user.email });
            if (!existingUser) {
                const newUser = this.userRepository.create(user);
                await this.userRepository.save(newUser);
                console.log(`User ${newUser.nombre} ${newUser.apellido} created successfully.`);
            } else {
                console.log(`User with email ${user.email} already exists.`);
            }
        }
    }
}