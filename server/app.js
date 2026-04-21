const express = require('express');
const cors = require('cors');
require

const app = express();

app.use(cors());
app.use(express.json());

const contactRoute = require('./routes/contactRoute');
app.use('/api',contactRoute);

app.listen(process.env.port,()=>{
    console.log(`Server is running on http://localhost:${process.env.port}`);  
});