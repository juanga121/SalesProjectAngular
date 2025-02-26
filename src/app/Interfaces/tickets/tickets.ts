export interface Tickets {
    name : string;
    description : string;
    quantity : number;
    price : number;
    event_date : Date;
    event_location : string;
    event_time : string;
    state : TicketsState;
}

export enum TicketsState
{
    Disponible,
    Agotado,
    Expirado
}
