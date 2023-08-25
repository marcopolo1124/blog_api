import express, { Request, Response, NextFunction } from "express";
import articleRouter from "./routes/articles";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/blog";

mongoose.connect(MONGO_DB_URL);

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
