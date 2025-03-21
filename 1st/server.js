const express= require('express');
const calciRoutes = require ('./routes/calciRoutes');

const app=express();
const PORT=9876;

app.use('/numbers',calciRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`);
});

