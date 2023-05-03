//json-server --watch src/db.json

export interface User {
    user_id:number,
    name:string,
    password:string,
    email:string,
    password_hash:string,
    created_at:Date,
}
