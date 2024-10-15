import {Request, Response} from "express";
import { gradeHistoriesCollection } from "../database";
import { GradeHistory } from "../models/gradeHistories";
import { ObjectId } from "mongodb";

export const getGradeHistories = async (req: Request, res: Response) => {
    try{
      const gradeHistories = (await gradeHistoriesCollection.find({}).toArray()) as GradeHistory[];
      res.status(200).json(gradeHistories);
    }
    catch(error){
      if(error instanceof Error){
        console.log(`Issue with Getting Users: ${error.message}`);
      }
      else{
        console.log(`Error with Getting Users: ${error}`);
      }
      res.status(500).send("oops.");
    }
};