export interface User {
    id?:string;
    name:string;
    email:string;
    password?:string;
    role:'student'|'instructor'|'admin';
    isVerified:boolean;
    profilePicture?:string;
    createdAt?:Date;
    updatedAt?:Date;
}