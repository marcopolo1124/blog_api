import express, { Request, Response, NextFunction } from "express";
import Article from "../models/article";

const router = express.Router();

interface pageQuery {
    perPage: number;
    page: number;
}

router.get("/", async (req: Request<any, any, any, pageQuery>, res, next) => {
    console.log("route");
    try {
        const perPage: number = req.query.perPage || 10;
        const page = req.query.page || 1;
        if (page <= 0) {
            const error = new Error(
                "page must be an integer greater or equal to 1"
            );
            throw error;
        }
        if (perPage <= 0) {
            const error = new Error(
                "perPage must be an integer greater or equal to 1"
            );
            throw error;
        }
        const articles = await Article.find(
            {},
            {},
            { skip: (page - 1) * perPage, limit: perPage }
        );
        res.send({
            articles,
            pageCount: Math.ceil((await Article.count()) / perPage)
        });
    } catch (e) {
        next(e);
    }
});

router.get("/get/:slug", async (req, res, next) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (!article) {
            res.status(404).send(
                JSON.stringify({
                    message: "No articles found"
                })
            );
        } else {
            res.send({
                article
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.put("/edit", async (req, res, next) => {
    console.log("create");
    console.log(req.body);
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        console.log({ article });
        await article.save();
        res.status(201).send({
            article,
            message: "article created"
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.put("/edit/:id", async (req, res, next) => {
    try {
        console.log(req.body);
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

router.delete("/delete/:id", async (req, res, next) => {
    try {
        console.log(req.params.id);
        await Article.findByIdAndDelete(req.params.id);
        res.status(204).send("no content");
        return;
    } catch (e) {
        console.log(e);
        next(e);
    }
});

export default router;
