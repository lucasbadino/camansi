import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { UserSeed } from "./users/user.seed";
import { UsersModule } from "src/users/users.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UsersModule
    ],
    controllers: [],
    providers: [ UsersService, UserSeed],
    exports: [],
})
export class SeedModule { }
// This module is intended for seeding the database with initial data.
// It can be used to run seed scripts or import initial data into the database.