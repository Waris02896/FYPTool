if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const session = require('express-session');
const cookieparser = require('cookie-parser');
const { urlencoded } = require('express');

const app = express()

app.use(cookieparser());
app.use(express.json());
app.use(urlencoded({ extended: true }));


// Routes
const register = require('./routes/auth');
const task = require('./routes/task');
const project = require('./routes/project');

app.use('/fyp',
    register,
    task,
    project
)

app.use('/ffyp',
    register,
    task,
    project
)



app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})

