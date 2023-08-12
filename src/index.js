const express = require('express'); //import package express mar
const db = require('./config/db');
const bodyparser = require('body-parser'); 
const userRoutes = require('./routes/userRoutes');
const product = require('./routes/product');
const authRoutes = require('./routes/authRoutes');
const cors =  require('cors');
const app = express(); // hong zai express leo ao app pai zai tor
//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : false}));
//cors
app.use(cors());
//router
app.use('/', userRoutes);
app.use('/', product);
app.use('/', authRoutes);


app.get('/', (req, res)=> {

    res.send('Hello');
});


app.listen(3005, () =>{
    console.log('Server is running on port 3000');
});
