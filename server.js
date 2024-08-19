require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/usersRoute");
const tradeHistory = require("./routes/tradeHistoryRoute");
//const cors = require('cors');


const app = express();

// Middlewares
app.use(express.json());
/*app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5174', 'https://trade-bank-client.vercel.app/'],
}));*/

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/tradeHistory", tradeHistory);

// Connection to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listening for request
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT} & MongoDB conected!!`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
