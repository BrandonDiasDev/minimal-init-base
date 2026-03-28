import "dotenv/config";
import  express from "express";
import cors from 'cors'

import routes from "./routes/routes";


const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));
app.use(express.json());
app.use(routes);


// Global error handler middleware
app.use((err: any, req: any, res: any, next: any) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});



export default app;