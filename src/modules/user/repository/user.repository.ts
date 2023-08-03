import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/common/cassandra/services/cassandra.service';
import { User } from '../model/user.model';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository implements OnModuleInit {

    constructor(private cassandraService: CassandraService) { }

    userMapper: mapping.ModelMapper<User>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'User': {
                    tables: ['users'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
    }

    async getUsers() {

        try {
        const userData=[];
        const data= (await this.userMapper.findAll()).toArray();
        for(const user of data){

            if (user.deletedAt===null) {
                userData.push(user);
            }
        }
        return userData;
        } catch (error) {
            return error;
        }
        
    }

    async getUserById(id: string) {
        const data =(await this.userMapper.find({ id: id})).toArray();
        if (data[0].deletedAt==null) {
            return data;
        }
        return data[0].fullname + " user deleted at "+ data[0].deletedAt;
    }

    async createUser(user: User) {
        user.id = uuidv4();
        user.createdAt= new  Date();
        return (await this.userMapper.insert(user)).toArray();
    }

    async updateUserName(id: string, dto: UpdateUserDTO) {
        const user = new User();
        user.id  = id;
        if (dto.fullname!=null) {
            user.fullname = dto.fullname;
        }
        if (dto.username!=null) {
            user.username = dto.username;
        }
        if (dto.password!=null) {
            user.password = dto.password;
        }
        if (dto.email!=null) {
            user.email = dto.email;
        }
        if (dto.is_active!=null) {
            user.isActive = dto.is_active;
        }
        if (dto.is_blocked!=null) {
            user.isBlocked = dto.is_blocked;
        }
        user.updatedAt= new Date();
        return (await this.userMapper.update(user)).toArray();
    }

    async deleteUser(id: string) {
        const user = new User();
        user.id  = id;
        user.deletedAt = new Date();
        return (await this.userMapper.update(user)).toArray();
    }
}