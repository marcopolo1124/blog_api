import express, { Request, Response, NextFunction } from "express";
import Article from "../models/article";
import { nextTick } from "process";
const router = express.Router();

router.get("/:slug", async (req, res, next) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        res.send({
            article
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post("create", async (req, res, next) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        await article.save();
        res.status(201).send({
            article,
            message: "article created"
        });
    } catch (e) {
        console.log("failed");
        next(e);
    }
});

router.put("update/:id", async (req, res, next) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        });
        article?.save();
        res.send({
            article,
            message: "article updated"
        });
    } catch (e) {
        console.log("failed");
        next(e);
    }
});

router.delete("delete/:id", async (req, res, next) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        article?.save();
        res.status(204);
    } catch (e) {
        console.log("failed");
        next(e);
    }
});

export default router;
