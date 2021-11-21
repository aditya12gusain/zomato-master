require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// Database Connection
import ConnectDB from "./database/connection";

// google authentication config
import googleAuthConfig from "./config/google.config";

// API
import Auth from "./API/Auth";

// passport config
googleAuthConfig(passport);

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());

// Application Routes
zomato.use("/auth", Auth);

zomato.listen(4000, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!!");
    })
    .catch((error) => {
      console.log("Server is running, but database connection failed...");
      console.log(error);
    });
});
