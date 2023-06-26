//json-server --watch src/db.json

export interface User {
    id:number,
    name:string,
    password:string,
    email:string,
    phone: string,
    address: string,
    country: string,
    is_active: boolean,
    created_at:Date,
    password_hash:string,
}
