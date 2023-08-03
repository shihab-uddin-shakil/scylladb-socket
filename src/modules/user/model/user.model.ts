export class User {
     id: string;
     trackerId?: string ;
     username: string;
     email: string;
     password: string;
     fullname: string;
     isActive: boolean;
     isBlocked: boolean;
     createdAt?: Date;
     updatedAt?: Date;
     deletedAt?: Date;
}