const express = require('express');
const connectDB=require('./config/db')

const app = express();

//connect Database
connectDB();

//Init Middleware
app.use(express.json({extended:false})) //access req.body

app.get('/',(req,res) =>res.send('API Running'));

//Define Routes
app.use('/api/users',require('./routers/api/users'))
app.use('/api/auth',require('./routers/api/auth'))
app.use('/api/profile',require('./routers/api/profile'))
app.use('/api/post',require('./routers/api/post'))

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>console.log.apply('server started on port ${PORT}'));
console.log(`server started on port ${PORT}`)