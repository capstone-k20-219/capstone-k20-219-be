export declare class GetVehicleRequestDto {
    id?: number;
    userId?: string;
    typeId?: string;
    plateNo?: string;
}
export declare class CreateVehicleRequestDto {
    plateNo: string;
    typeId: string;
    description?: string;
}
declare const UpdateVehicleRequestDto_base: import("@nestjs/common").Type<Partial<CreateVehicleRequestDto>>;
export declare class UpdateVehicleRequestDto extends UpdateVehicleRequestDto_base {
    id: number;
}
export {};
