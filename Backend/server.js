if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const session = require('express-session');
const cookieparser = require('cookie-parser');
const { urlencoded } = require('express');
// const cors = require('cors');

const app = express();

// app.use(cors(
//     {
//         AccessControlAllowOrigin: '*',
//         origin:'*',
//         methods:'GET,HEAD,PUT,POST,PATCH,DELETE'
//     }
// ))

app.use(cookieparser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})


// Routes
const register = require('./routes/auth');
const task = require('./routes/taskCategories');
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

