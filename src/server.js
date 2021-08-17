import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import bodyParser from "body-parser";

const app = express();
const logger = morgan(`dev`);

app.set(`view engine`, `pug`);
app.set(`views`, process.cwd() + `/src/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6 * 1000 * 60 * 60,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(flash());

app.use(localsMiddleware);

app.use("/img", express.static(__dirname + "/images"));
app.use("/video", express.static(__dirname + "/videos"));
app.use("/uploads", express.static("uploads"));
app.use("/excels", express.static("excels"));
app.use("/static", express.static("assets"));
app.use(`/`, rootRouter);
app.use(`/users`, userRouter);

export default app;
