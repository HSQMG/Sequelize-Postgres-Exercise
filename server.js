const express = require("express");
const path = require('path');
const expressHbs = require('express-handlebars');
const rootRoute = require("./routes/index");
const detailRoute = require("./routes/detail");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'html')));
app.engine('hbs', expressHbs.engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'layout',
    extname: 'hbs',
    helpers: {
        getURLQuery: (query, param, value) => `/?${param}=${encodeURIComponent(value)}`,
    }
}));
app.set('view engine', 'hbs');
app.use("/", rootRoute);
app.use("/detail", detailRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
