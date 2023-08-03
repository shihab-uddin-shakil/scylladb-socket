import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;

    
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isBlocked: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;
  
    @IsOptional()
    @IsDate()
    updatedAt?: Date;
  
    @IsOptional()
    @IsDate()
    deletedAt?: Date;

}