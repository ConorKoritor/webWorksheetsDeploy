import { MongoClient, Db, Collection}  from "mongodb";
import  dotenv from "dotenv";
import User from './models/user'
import { GradeHistory } from "./models/gradeHistories";


  dotenv.config();
  const connectionString : string  = process.env.DB_CONN_STRING || "";
  const dbName : string = process.env.DB_NAME || "Web2_2024";
  const client = new MongoClient(connectionString);

let db : Db 
export let usersCollection : Collection<User>
export let gradeHistoriesCollection : Collection<GradeHistory>
export const collections: { users?: Collection<User>, gradeHistories?: Collection<GradeHistory> } = {};


client.connect().then
(()=>
  {
  db = client.db(dbName);
  usersCollection  = db.collection('users');
  gradeHistoriesCollection = db.collection('grades');
  collections.users = usersCollection;
  collections.gradeHistories = gradeHistoriesCollection;
  console.log('Connected to database');
}
)
.catch ((error) =>
{
    if (error instanceof Error)
    {
        console.log(`issue with db connection ${error.message}`);
    }
    else
    {
        console.log(`error with ${error}`)
    }
});
        