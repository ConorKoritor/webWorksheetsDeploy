import { ObjectId } from "mongodb";

export interface GradeHistory{
    id?: ObjectId;
    student_id: number;  //int studentId
    class_id: number;    //int classId
    scores: Score[];     //Array of scores
}

interface Score{
    type: 'exam' | 'quiz' | 'homework';
    score: number;
}