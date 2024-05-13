export declare class GetParkingTicketDto {
    serviceId?: string;
    fromDate?: Date;
    toDate?: Date;
}
export declare class CreateParkingTicketDto {
    slotId?: string;
    userId?: string;
    email?: string;
    plateNo: string;
}
export declare class CheckOutDto {
    id: string;
    plateNo: string;
    email?: string;
}
export declare class UpdateTicketPaidStatusDto {
    id: string;
    isPaid: boolean;
}
