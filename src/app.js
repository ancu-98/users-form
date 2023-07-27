//? Dependencies
const express = require('express');
const cors = require('cors');
const {Client} = require('pg');

//? Initial Configs

const app = express();
//? Enable incoming JSON data
app.use(express.json());
//? Enable CORS
app.use(cors());

//? Database Server Conection
const client = new Client({
    connectionString: process.env.DATABASE_URL
})

app.get("/ping", async (req, res) => {
    await client.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(result.rows[0].message) 
    await client.end()
    res.json(result.rows[0]);
})


//? Files
const config = require('../config');
const db = require('./utils/database');
const initModels = require('./models/initModels');
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');


//? Authenticate DB
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch(err => console.log(err))
//? Sync Database Models
db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

//? Initialize my models relations
initModels();

//? Root Route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'OK!',
        routes: {
            users: ""
        }
    })
});

//? Defining routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/users', authRouter);

app.listen(config.api.port, () => {
    console.log(`Sever started on ${config.api.host}`)
});


