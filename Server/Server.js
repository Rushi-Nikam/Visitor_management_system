const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routers/userRoute');
// const sequelize = require('./db/db');
const visitorRoutes= require('./routers/VisitorsRoutes');
const roleRoutes = require('./routers/RoleRoute')
const app= express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
     res.send("hii")
})
app.use('/api/visit',visitorRoutes);
app.use('/api', roleRoutes);
app.use('/api/user',userRoute);

app.listen(PORT,()=>{
    console.log(`SERVER is running on  http://localhost:${PORT}`);
})