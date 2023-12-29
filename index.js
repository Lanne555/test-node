const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const app = express();
const port = 3000;
const path = require('path');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, "/web_file/")));

app.get("/", (req, res) => {

    res.send('error');

})

app.listen(port, () => {

    console.log(chalk.green("listening on port %d", port));

})