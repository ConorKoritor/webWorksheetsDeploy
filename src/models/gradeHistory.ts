import { ObjectId } from "mongodb";
import Joi from "joi";

export default interface GradeHistory{
    id?: ObjectId;
    student_id: number;
    class_id: number;
    scores: Score[];
}

interface Score{
    type: 'exam' | 'quiz' | 'homework';
    score: number;
}