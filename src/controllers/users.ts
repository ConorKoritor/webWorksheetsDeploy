import {Request, Response} from "express";
import { usersCollection } from "../database";
import User from "../models/user";
import { UserUpdate } from "../models/user";
import { ObjectId } from "mongodb";

export const getUsers = async (req: Request, res: Response) => {
    try{
      const users = (await usersCollection.find({}).toArray()) as User[];
      res.status(200).json(users);
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

export const getUserById = async (req: Request, res: Response) => {
    //get a single user by id from the database
    let id:string = req.params.id;
    try{
      const query = { _id: new ObjectId(id) };
      const user = (await usersCollection.findOne(query)) as User;

      if(user){
        res.status(200).json(user);
      }

      //Added this because the response was timing out using the catch block. For some reason
      //the try didn't catch the error when the id was invalid.
      else{
        res.status(404).send(`Unable to find matching document with id ${req.params.id}`);
      }
    }
    catch(error){
      if(error instanceof Error){
        console.log(`Issue with Getting User: ${error.message}`);
      }
      else{
        console.log(`Error with Getting User: ${error}`);
      }
      res.status(404).send(`Unable to find matching document with id ${req.params.id}`);
    }
};

export const createUser = async (req: Request, res: Response) => {
    // create a new user in the database
  try{
    const newUser = req.body as User;

    newUser.dateJoined = new Date();

    const result = await usersCollection.insertOne(newUser);

    if(result){
      res.status(201).location(`${result.insertedId}`).json({message : `Created a new user with id ${result.insertedId}`})
    }
    else{
      res.status(500).send("Failed to create new user.")
    }
    
  }
  catch(error){
    if(error instanceof Error){
      console.log(`Issue with Creating User: ${error.message}`);
    }
    else{
      console.log(`Error with Creating User: ${error}`);
    }
    res.status(400).send("Unable to create new user.");
  }
  };

  export const updateUser = async (req: Request, res: Response) => {
    //Updates data for a user in the database by id
    let id:string = req.params.id;

  try{
    const query = { _id: new ObjectId(id) };

    const newData = req.body as UserUpdate;

    newData.lastUpdated = new Date();

    const result = await usersCollection.updateOne(query, {$set: newData});

    if(result){
      res.status(201).json({message : `Updated User with id ${id}`})
    }
    else{
      res.status(500).send(`Failed to update user with ID ${id}.`)
    }
    
  }
  catch(error){
    if(error instanceof Error){
      console.log(`Issue with Updating User: ${error.message}`);
    }
    else{
      console.log(`Error with Updating User: ${error}`);
    }
    res.status(400).send("Unable to update User.");
  }
  };
   
  export const deleteUser = async (req: Request, res: Response) => {
    // logic to delete user by ID from the database
  
    let id:string = req.params.id;
    try{
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
  
      if(result && result.deletedCount){
        res.status(202).json({message : `Succesfully removed user with id ${id}`});
      }
      else if(!result){
        res.status(400).json({message : `Failed to remove user with id ${id}`});
      }
      else if(!result.deletedCount){
        res.status(404).json({message : `No user found with id ${id}`});
      }
    }
    catch(error){
      if(error instanceof Error){
        console.log(`Issue with Deleting User: ${error.message}`);
      }
      else{
        console.log(`Error with Deleting User: ${error}`);
      }
      res.status(400).send(error);
    }
  };
  

