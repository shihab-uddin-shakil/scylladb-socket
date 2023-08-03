import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../model/user.model';
import * as crypto from 'crypto';
import { UpdateUserDTO } from '../dto/update-user-dto';

@Injectable()
export class UserService {
    
    constructor(private userRepository: UserRepository){}

    async getUsers() {
        return this.userRepository.getUsers();
    }

    async getUserById(id: string) {
      try {
        const data= this.userRepository.getUserById(id);
        return data;
      } catch (error) {
        console.log(error);
      }
    }

    async createUser(user: User) {
      try {
        await this.userRepository.createUser(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    }

    async updateUserName(id: string, dto:UpdateUserDTO) {
      try {
         await this.userRepository.updateUserName(id, dto);
         const data =this.getUserById(id)
        return data ;
      } catch (error) {
        return error;
      }
    }

    async deleteuser(id: string) {
      try {
         await this.userRepository.deleteUser(id);
        return "user deletd successfully" ;
      } catch (error) {
        return error;
      }
    }
    async encryptPassword(password: string): Promise<string> {
        const algorithm = "aes-256-cbc";
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
    
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encryptedPassword = cipher.update(password, "utf8", "hex");
        encryptedPassword += cipher.final("hex");
        const encryptedData = `${encryptedPassword}:${iv.toString(
          "hex"
        )}:${key.toString("hex")}`;
        return encryptedData;
      }
    
      async decryptPassword(encryptedData: string): Promise<string> {
        const algorithm = "aes-256-cbc";
        const [encryptedPassword, iv, key] = encryptedData.split(":");
    
        const decipher = crypto.createDecipheriv(
          algorithm,
          Buffer.from(key, "hex"),
          Buffer.from(iv, "hex")
        );
        let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf8");
        decryptedPassword += decipher.final("utf8");
    
        return decryptedPassword;
      }
    
}