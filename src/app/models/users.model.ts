//json-server --watch src/db.json

// export interface User {
//     id:number,
//     name:string,
//     edad: string,
//     pais: string,
//     password:string,
//     email:string,
//     password_hash:string,
//     created_at:Date,
// }

export interface User {
    id: number,
    address: string,
    country: string,
    created_at: string,
    email: string,
    is_active: boolean,
    name: string,
    password: string,
    phone: string
}