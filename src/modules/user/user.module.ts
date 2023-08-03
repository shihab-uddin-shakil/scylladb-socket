import { CassandraModule } from "src/common/cassandra/cassandra.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repository/user.repository";
import { Module } from "@nestjs/common";


@Module({
    imports: [CassandraModule],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository
    ],
    exports: [
        UserService,
        UserRepository
    ]
})
export class UserModule { }