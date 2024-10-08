import { ObjectId } from "mongodb";

export default interface User {
    name: string;
    phonenumber: string;
    email: string;
    id?: ObjectId;
    dateJoined?: Date;
    lastUpdated?: Date;
}

export interface UserUpdate{
    name?: string;
    phonenumber?: string;
    email?: string;
    id?: ObjectId;
    dateJoined?: Date;
    lastUpdated?: Date;
}