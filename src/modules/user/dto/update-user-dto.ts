import { IsOptional, IsString } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    fullname: string;

    @IsOptional()
    is_active: boolean;

    @IsOptional()
    is_blocked: boolean;
}