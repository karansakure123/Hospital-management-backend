import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import multer from "multer";

// Import routes and middleware
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import departmentRoutes from "./router/departmentRoutes.js";
import accAndDirecRouter from "./router/about/accAndDirecRouter.js";
import corpAndEqpRouter from "./router/about/corpAndEqpRouter.js";
import navRouter from "./router/homepage/navRouter.js";
import introRouter from "./router/homepage/introRouter.js";
import whoWeRouter from "./router/homepage/whoWeRouter.js";
import infraRouter from "./router/homepage/infraRouter.js";
import csrRouter from "./router/homepage/csrRouter.js";
import testRouter from "./router/homepage/testRouter.js";
import speakRouter from "./router/homepage/speakRouter.js";
import blogRouter from "./router/homepage/blogRouter.js";
import footerRouter from "./router/homepage/footerRouter.js";
import healthRouter from "./router/homepage/healthRouter.js";
import heroRouter from "./router/homepage/heroRouter.js";
import anaesthRouter from "./router/subdepartment/anaesthRouter.js";
import cardioRouter from "./router/subdepartment/cardioRouter.js";
import orthoRouter from "./router/subdepartment/orthoRouter.js";

// Initialize environment variables
config(); // This assumes .env is at the root

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

// Initialize database connection
dbConnection();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Route registrations
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/about", accAndDirecRouter, corpAndEqpRouter);
app.use(errorMiddleware);

// Homepage routes
app.use("/api/v1/navbar", navRouter);
app.use("/api/v1/intro", introRouter);
app.use("/api/v1/infra", infraRouter);
app.use("/api/v1/whowe", whoWeRouter);
app.use("/api/v1/csr", csrRouter);
app.use("/api/v1/testimonial", testRouter);
app.use("/api/v1/patientspeak", speakRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/footer", footerRouter);
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/hero", heroRouter);

// Subdepartment routes
app.use("/api/v1/anaesthesio", anaesthRouter);
app.use("/api/v1/cardiology", cardioRouter);
app.use("/api/v1/orthopedics", orthoRouter);

export default app;
