export declare class CreateParkingSlotDto {
    id: string;
    typeId: string;
    x_start: number;
    x_end: number;
    y_start: number;
    y_end: number;
}
export declare class UpsertParkingSlotDto {
    slots: CreateParkingSlotDto[];
}
export declare class GetParkingSlotDto {
    id?: string;
    typeId?: string;
}
declare const UpdateParkingSlotDto_base: import("@nestjs/common").Type<Partial<CreateParkingSlotDto>>;
export declare class UpdateParkingSlotDto extends UpdateParkingSlotDto_base {
}
export {};
