import express, { response } from "express";
import Hyperdeck from "./Hyperdeck.js";

import cors from "cors";
import morgan from "morgan";

async function main() {
    const initHyperdeck = async () => {
        const hd1 = new Hyperdeck("10.61.57.142");
        const initHd = await hd1.startConnection();
        const clipList = await hd1.getClipList();
        return hd1;
    };

    const generateResPayload = async (req, res, next, response) => {
        if (response.code === 200) {
            const status = await hd1.getStatus();
            const resPayload = JSON.stringify({
                status: res.statusCode,
                message: res.statusMessage,
                data: status
            });
            return resPayload;
        } else {
            const resPayload = JSON.stringify({
                status: res.statusCode,
                message: res.message,
                data: response
            });
            return resPayload;
        }
    };

    const app = express();

    const PORT = 4000;

    const hd1 = await initHyperdeck();

    app.use(cors());

    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");

        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );

        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type"
        );

        res.setHeader("Access-Control-Allow-Credentials", true);

        next();
    });

    app.use(morgan('dev'));

    app.get("/cliplist", async (req, res, next) => {
        const response = await hd1.getClipList();
        const resPayload = await generateResPayload(req, res, next, response);
        res.send(resPayload);
    });

    app.get("/status", async (req, res, next) => {
        const response = await hd1.getStatus();
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.get("/play", async (req, res, next) => {
        const response = await hd1.playClip();
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.get("/stop", async (req, res, next) => {
        const response = await hd1.stopClip();
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.get("/nextclip", async (req, res, next) => {
        const response = await hd1.nextClip();
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.get("/prevclip", async (req, res, next) => {
        const response = await hd1.prevClip();
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.get("/loopplay", async (req, res, next) => {
        const response = await hd1.loopPlay();
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.get("/cue", async (req, res, next) => {
        const clipId = req.query.id;
        const response = await hd1.cueClip(clipId);
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.get("/liveInput", async (req, res, next) => {
        const response = await hd1.liveInput();
        const resPayload = await generateResPayload(req, res, next, response);
        hd1.cleanListeners();
        res.send(resPayload);
    });

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

main();
