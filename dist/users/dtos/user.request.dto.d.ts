import { UserRoleEnum } from '../enums/user-role.enum';
export declare class GetUserRequestDto {
    id?: string;
    role?: string;
}
export declare class CreateUserRequestDto {
    email: string;
    password: string;
    name: string;
    dob: Date;
    phone: string;
    image: string;
    bankAccount: BankAccountDto[];
    role: UserRoleEnum[];
}
export declare class BankAccountDto {
    accountNo: string;
    bank: string;
}
declare const UpdateUserRequestDto_base: import("@nestjs/common").Type<Partial<CreateUserRequestDto>>;
export declare class UpdateUserRequestDto extends UpdateUserRequestDto_base {
    id: string;
}
export {};
