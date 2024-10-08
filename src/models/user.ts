import { ObjectId } from "mongodb";

export default interface User {
    name: string;
    phonenumber: string;
    email: string;
    id?: ObjectId;
}

export interface UserUpdate{
    name?: string;
    phonenumber?: string;
    email?: string;
    id?: ObjectId;
}
