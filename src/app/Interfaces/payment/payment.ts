export interface Payment {
    id?: string;
    PaymentsId: string;
    PaymentsUsersId: string;
    QuantityHistory: number;
    TotalToPay?: number;
    PurchaseStatus?: purchaseStatus;
    Creation_date?: string;
}

export enum purchaseStatus {
    Retencion,
    Aprobado,
    Expirado
}