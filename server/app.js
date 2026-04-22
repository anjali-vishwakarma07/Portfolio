const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//vercel frontend url
app.use(cors({
  origin: "https://portfolio-xi-seven-gv72u6lsps.vercel.app",
  methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const contactRoute = require('./routes/contactRoute');
app.use('/api',contactRoute);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);  
});