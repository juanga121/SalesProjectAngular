export interface Users {
    identity_type: UserIdentityType;
    document_identity: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
}

export enum UserIdentityType {
    CedulaCiudadania,
    CedulaExtranjeria,
    TrejetaIdentidad
}