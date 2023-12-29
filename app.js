const express =require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const debug = require('debug')('app')
const app = express();
const port = 8000;

app.use(morgan('combined'));

app.get("/", (req,res)=>{

    res.send('hello user');

})

app.listen(port,()=>{

    console(chalk.green("listening on port %d",port));

})