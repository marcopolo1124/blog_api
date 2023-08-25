import mongoose from "mongoose";
import IArticle from "../IArticle";

declare global {
    namespace Express {
        export interface Request {
            article?: mongoose.Document<IArticle>;
        }
    }
}
