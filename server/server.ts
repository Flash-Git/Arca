import express, { Express, Request, Response } from "express";
import path from "path";

class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    // Bodyparser middleware
    this.app.use(express.json());

    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static("build/client"));

      this.app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "build", "client", "index.html"));
      });
    }
  }
  public start(port: number | string): void {
    this.app.listen(port, () => console.log(`Server started on port ${port}`));
  }
}
export default Server;
