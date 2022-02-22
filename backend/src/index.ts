import express, { Application, Request, Response } from "express";
const app: Application = express();
import authRoutes from "./routes/auth";
import homeRoutes from "./routes/home";
import cors from "cors";


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Home route
app.get("/", async (req: Request, res: Response) => {

  res.send("hi");
});

app.use("/auth", authRoutes);
app.use("/home", homeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
