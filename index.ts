import express, { Express } from "express";

import Server from "./server/server";

const app: Express = express();

const PORT = process.env.PORT || 5000;

const server: Server = new Server(app);

server.start(PORT);
