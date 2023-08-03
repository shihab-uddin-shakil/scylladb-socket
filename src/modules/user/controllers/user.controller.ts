import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDTO } from '../dto/update-user-dto';
import { CreateUserDto } from '../dto/create-user-dto';


@Controller()
export class UserController {
    
    constructor(private userService: UserService){}

    @Get('users')
    async getUsers() {
        return this.userService.getUsers();
    }

    @Get('users/:id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Put('users/:id')
    async updateUserById(@Param('id') id: string, @Body() user: UpdateUserDTO) {
        return this.userService.updateUserName(id, user);
    }

    @Post('users')
    async createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @Delete('users/delete/:id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteuser(id);
    }
}