import express,{Express, Response, Request} from "express";

const app: Express = express();
const port: number = 3000;

app.get("/article", (req: Request, res: Response) => {
    res.json({
        articles: []
    })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})