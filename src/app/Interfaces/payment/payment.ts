export interface Payment {
    id?: string;
    paymentsId: string;
    paymentsUsersId: string;
    quantityHistory: number;
    totalToPay?: number;
    purchaseStatus?: PurchaseStatus;
    creation_date?: string;
}

export interface PaymentHistory {
    id?: string;
    nameTicket: string;
    nameUser: string;
    emailUser: string;
    totalToPay: number;
    quantityHistory: number;
    purchaseStatus: PurchaseStatus;
    creation_date: string;
}


export enum PurchaseStatus {
    Retencion,
    Aprobado,
    Expirado
}