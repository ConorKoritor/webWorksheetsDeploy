import {Request, Response} from "express";
import { gradeHistoriesCollection } from "../database";
import { GradeHistory } from "../models/gradeHistories";
import { ObjectId } from "mongodb";

export const getGradeHistories = async (req: Request, res: Response) => {
    try{
      const {filter} = req.query;

      const filterObj = filter ? JSON.parse(filter as string) : {};

      const gradeHistories = (await gradeHistoriesCollection
        .find(filterObj)
        //Filters to only show the student_id and class_id fields
        //.project({'student_id': 1, 'class_id': 1 })
        
        //Filters to not show the scores field student_id field
        .project({'student_id': 0, 'scores.score': 0 })
        .toArray()) as GradeHistory[];
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