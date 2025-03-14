const express = require("express");
const authRoutes = require("./authRoutes");
const cors = require('cors');
const contexts = require('./context/cerdentails')

const app = express();


const allowedOrigins = [
  contexts.LOCALHOST_ALLOWED_ORIGIN,
  contexts.HOSTED_ALLOWED_ORIGIN,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
