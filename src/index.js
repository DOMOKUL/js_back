const express = require('express');
const http = require('http');
const { initDB } = require('./database');
const apiTodoRouter = require('./controllers/api-todo.js');
const apiAuthRouter = require("./controllers/api-auth");
const apiUsersRouter = require("./controllers/api-users");
const { notFound, errorHandler } = require('./middlewares/middlewares');

const app = express();

initDB();

app.use((req, res, next) => {
    console.log("URL = ", req.url);
    console.log("Original_URL = ", req.originalUrl);
    console.log("METHOD = ", req.method);
    console.log("HOST = ", req.headers.host);
    console.log("IsSecure = ", req.secure);
    console.log("BODY", req.body);
    console.log("QUERY", req.query);

    next();
});

app.use(express.json());
app.use("/api/todos", apiTodoRouter);
app.use("/api/auth", apiAuthRouter);
app.use("/api/user", apiUsersRouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3000, () => {
    console.log("Server started");
});