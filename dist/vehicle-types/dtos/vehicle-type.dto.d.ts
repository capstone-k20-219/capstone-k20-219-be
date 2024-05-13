export declare class GetVehicleTypeRequestDto {
    id?: string;
}
export declare class CreateVehicleTypeRequestDto {
    id: string;
    name: string;
    parkingFee?: number;
    slotBookingFee?: number;
}
declare const UpdateVehicleTypeRequestDto_base: import("@nestjs/common").Type<Partial<CreateVehicleTypeRequestDto>>;
export declare class UpdateVehicleTypeRequestDto extends UpdateVehicleTypeRequestDto_base {
}
export {};
