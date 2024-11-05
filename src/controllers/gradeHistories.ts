import {Request, Response} from "express";
import { gradeHistoriesCollection } from "../database";
import { GradeHistory } from "../models/gradeHistories";
import { ObjectId } from "mongodb";

export const getGradeHistories = async (req: Request, res: Response) => {
    try{
      //Logic to be able to filter by adding ?filter={field} to the end of the URL
      const {filter} = req.query;
      const filterObj = filter ? JSON.parse(filter as string) : {};

      //Logic to return data in pages instead of all at once
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 0) || 0;

      const gradeHistories = (await gradeHistoriesCollection
        .find(filterObj)
        .project({'student_id': 1, 'class_id': 1 }) //Filters to only show the student_id and class_id fields Change 1s to 0s to exclude those fields and show the rest
        .sort({'class_id': 1})//Sorts by Ascending class_id Change 1 to -1 to sort by Descending class_id
        .skip((page - 1) * pageSize) //Skips the first page which will be empty
        .limit(pageSize) //Limits the amount of data shown per page        
        .toArray()) as GradeHistory[];
        
        if(!gradeHistories || !gradeHistories.length){
          res.status(404).send("No Grade Histories found.");
          return;
        }
      res.status(200).json(gradeHistories);
    }
    catch(error){
      if(error instanceof Error){
        console.log(`Issue with Getting Grades: ${error.message}`);
      }
      else{
        console.log(`Error with Getting Grades: ${error}`);
      }
      
      if (error instanceof Error && error.message.includes('connect')) {
        res.status(500).json({ error: 'Error connecting to the database' });
        return;
      }
    res.status(500).json({ error: 'An error occurred while retrieving grade histories' });
    }
};