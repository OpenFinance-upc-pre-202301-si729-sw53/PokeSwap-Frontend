export interface Operation {
    from_amount: number,
    from_crypto: string,
    is_active: boolean,
    operation_date: Date,
    plataform: string,
    status: string,
    to_amount: number,
    to_crypto: string,
    type: string,
    user_id: number,
    id: number,
}