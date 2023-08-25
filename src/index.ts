import express, { Request, Response, NextFunction } from "express";
import articleRouter from "./routes/articles";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/blog");

app.get("/", (req, res, next) => {
    res.send({
        message: "alive"
    });
});
app.use("/articles", articleRouter);

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).send({
        message: "Service failure",
        error: error
    });
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
