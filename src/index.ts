
import express, {Application, Request, Response} from "express" ;
import morgan from "morgan";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(morgan("tiny"));

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
