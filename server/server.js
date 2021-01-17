const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const compression = require("compression");

/**
 * routers
 */
const publicRouter = require("./router/public");
const userApi = require("./router/userApi");
const adminRouter = require("./routes/admin");
const moderatorRouter = require("./router/moderator");
const appRouter = require("./router/app");
const adminMiddleWare = require("./middlewares/admin");
const moderatorMiddleWare = require("./middlewares/moderator");
const seeds = require("./seeds");
const cors = require("cors");

const server = express();

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(compression());
server.use(cors());
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "public")));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(cookieParser());
server.use(fileUpload());
require("./config/passport")(passport);
// mongoDB

mongoose.connect(process.env.DB_URL, {
  poolSize: 10, // Maintain up to 10 socket connections
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
});
mongoose.set("useFindAndModify", false);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoDB");
});

server.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, _next) => {
  res.locals.user = req.user || null;
  _next();
});

const port = process.env.PORT || 3000;
// server.use(cache("5 minutes"));
// apicache.clear("/foo");
server.use("/api/user", userApi);
server.use("/", publicRouter);
server.use("/admin", adminMiddleWare, adminRouter);
server.use("/moderator", moderatorMiddleWare, moderatorRouter);
server.use("/app", appRouter);
server.use("/seeds", seeds);

server.get("/apple-app-site-association", (req, res) => {
  res.status(200);
  res.type("application/json");
  res.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: "CVLQAZVPTK.com.webaystore",
          paths: ["*"],
        },
      ],
    },
  });
});
server.get("/privacy-policy", (req, res) => {
  res.render("privacy");
});
// const User = require("./models/user");
// const bcrypt = require("bcryptjs");
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash("admin285SS", salt);

//   const admin = await User.create({
//     name: "admin",
//     username: "admin",
//     email: "admin@webay.com",
//     password: hash,
//     phone: "123465789",
//     role: [{ id: 0 }, { id: 1 }, { id: 2 }]
//   });
//   res.json(admin);
// });
// server.get("/create-admin", async (req, res) => {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash("admin285SS", salt);

//   const admin = await User.create({
//     name: "admin",
//     username: "admin",
//     email: "admin@webay.com",
//     password: hash,
//     phone: "123465789",
//     role: [{ id: 0 }, { id: 1 }, { id: 2 }]
//   });
//   res.json(admin);
// });
// const PaymentMethod = require("./models/paymentMethodsModel");
// app.get("/create-payment", async (req, res) => {
//   const methods = require("./config/constants").paymentMethods;
//   const newMethods = [
//     {
//       nameAr: "الدفع عند الاستلام",
//       nameEn: "Pay on delivery",
//       type: methods.delivery
//     },
//     {
//       nameAr: "حوالة بنكية",
//       nameEn: "Bank Transfer",
//       type: methods.bank
//     },
//     {
//       nameAr: "بطاقة إئتمان",
//       nameEn: "Credit or Debit card",
//       type: methods.creditCard
//     },
//     {
//       nameAr: "رصيدك في الحساب",
//       nameEn: "Account credits",
//       type: methods.wallet
//     }
//   ];
//   const createdMethods = await PaymentMethod.create(newMethods);
//   return res.json(createdMethods);
// });
// const Product = require("./models/product");
// app.get("/dev", async (req, res) => {
//   await Product.updateMany(
//     { "title.en": { $regex: "999" } },
//     { $set: { price: 800 } }
//   );
//   res.send("ok");
// });
server.listen(port, err => {
  if (err) throw err;
  console.log(`listen on port: ${port}`);
});
