
import express, {Application, Request, Response} from "express" ;
import morgan from "morgan";
import userRoutes from "../routes/users";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app: Application = express();


app.use(morgan("tiny"));

app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.get("/ping", async (_req : Request, res: Response) => {    
    res.send({
    message: "hello from Conor",
    });
});

app.get("/bananas", async (_req : Request, res: Response) => {
    res.send('hello world, this is bananas');
});

app.get("/sun", async (_req : Request, res: Response) => {
    res.send('Praise the sun \\[T]/');
});

app.get("/duck", async (_req : Request, res: Response) => {
    res.send('PRESENTING! Magictasticle Backflipping Rubber Duck (That spits fire)!');
});



 app.listen(PORT, () => {
    console.log("Server is running on port  --", PORT);
    });
