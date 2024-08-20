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


const app = express();

// Initialize environment variables
config({ path: "./config/config.env" });

// Initialize database connection
dbConnection();


// Configure CORS

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Requested Origin:", origin); // Log the requested origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    preflightContinue: false, // Ensure that this is set to false
    optionsSuccessStatus: 204 // Use a status code for successful OPTIONS requests
  })
);


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
app.use("/api/v1/anaesthesio", anaesthRouter);
app.use("/api/v1/cardiology", cardioRouter);
app.use("/api/v1/orthopedics", orthoRouter);

app.use(errorMiddleware);

export default app;
