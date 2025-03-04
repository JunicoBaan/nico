var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var flash = require("express-flash"); // Flash message
var session = require("express-session"); // Session

// Import routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var kategoriRouter = require("./routes/kategori");
var mahasiswaRouter = require("./routes/mahasiswa"); // ✅ Mahasiswa

var app = express();

app.use(express.static("./public"));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session setup
app.use(
  session({
    cookie: { maxAge: 6000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret: "secret",
  })
);

app.use(flash()); // Flash middleware

// Use routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/kategori", kategoriRouter);
app.use("/mahasiswa", mahasiswaRouter); // ✅ Mahasiswa route

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
