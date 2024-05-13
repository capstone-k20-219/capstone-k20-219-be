export declare class GetServiceDto {
    id?: string;
    typeId?: string;
}
export declare class CreateServiceDto {
    name: string;
    prices: ServicePriceDto[];
}
export declare class ServicePriceDto {
    typeId: string;
    unitPrice: number;
}
declare const UpdateServiceDto_base: import("@nestjs/common").Type<Partial<CreateServiceDto>>;
export declare class UpdateServiceDto extends UpdateServiceDto_base {
    id: string;
}
export {};
