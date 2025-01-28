export interface Users {
    id?: string;
    identity_type: UserIdentityType;
    document_identity: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    creation_date: string;
    permissions: UserPermissions;
}

export enum UserPermissions {
    Administrador,
    Consumidor,
    SuperUsuario
}

export enum UserIdentityType {
    CedulaCiudadania,
    CedulaExtranjeria,
    TrejetaIdentidad
}