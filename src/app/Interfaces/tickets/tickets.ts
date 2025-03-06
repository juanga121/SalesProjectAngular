export interface Tickets {
    id? : string;
    name : string;
    description : string;
    quantity : number;
    price : number;
    event_date : string;
    event_location : string;
    event_time : string;
    state? : TicketsState;
    imageUrl? : string;
}

export enum TicketsState
{
    Disponible,
    Agotado,
    Expirado
}
