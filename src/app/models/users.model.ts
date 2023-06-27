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
    email: string,
    password: string,
    name: string,
    phone: string
    country: string,
    address: string,
    created_at: string,
    is_active: boolean,
}