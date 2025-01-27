require("dotenv").config();
const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./lib/dbconnect");

// --- ROUTES ---
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const scenarioRoutes = require("./routes/scenario");
const sessionRoutes = require("./routes/session");
const interviewRoutes = require("./routes/interview");
const resumeRoutes = require("./routes/resume");
const interviewerRoutes = require("./routes/interviewer");
const courseRoutes = require("./routes/course");
const chapterRoutes = require("./routes/chapter");
const documentRoutes = require("./routes/document");
const jobRoutes = require("./routes/job");
const insightsRoutes = require("./routes/insights");
const pushRoutes = require("./routes/webPush");
const chatRoutes = require("./routes/chatAiAvatar");
const voiceRoutes = require("./routes/voice");
const stripeRoutes = require("./routes/stripe");
const ticketRoutes = require("./routes/ticket");
const liveblocksRoutes = require("./routes/liveBlocks");
const achievementTokenRoutes = require("./routes/achievementToken");
const quizRoutes = require("./routes/quiz");
// --- ROUTES ---

// --- MIDDLEWARE ---
const bodyParser = require("body-parser");
const app = express();
const port = process.env.DEV_PORT || 3000;
const server = http.createServer(app);
// --- MIDDLEWARE ---

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Adjust to your client’s URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options("*", cors()); // Pre-flight request handling

connectDB();

app.use(bodyParser.json());

// --- ROUTES ---
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/scenario", scenarioRoutes);
app.use("/session", sessionRoutes);
app.use("/interview", interviewRoutes);
app.use("/resume", resumeRoutes);
app.use("/interviewer", interviewerRoutes);
app.use("/course", courseRoutes);
app.use("/chapter", chapterRoutes);
app.use("/document", documentRoutes);
app.use("/job", jobRoutes);
app.use("/insight", insightsRoutes);
app.use("/webpush", pushRoutes);
app.use("/chat", chatRoutes);
app.use("/voices", voiceRoutes);
app.use("/stripe", stripeRoutes);
app.use("/ticket", ticketRoutes);
app.use("/liveblocks", liveblocksRoutes);
app.use("/achieve", achievementTokenRoutes);
app.use("/quiz", quizRoutes);
// --- ROUTES ---

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.SERVER_DEVELOPMENT_URL
    : process.env.SERVER_PRODUCTION_URL;

server.listen(port, () => {
  console.log(`SERVER listening on ${URL}:${port}`);
});

module.exports = app;
