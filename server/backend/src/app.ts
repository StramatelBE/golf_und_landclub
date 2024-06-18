import { config } from "dotenv";
import express from "express";
import "reflect-metadata";
import { configureApp } from "./configureApp";

config();
const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 4500;

configureApp(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Importer et démarrer le serveur Unix Socket
import "./sockets/unixSocketServer";

export default app;