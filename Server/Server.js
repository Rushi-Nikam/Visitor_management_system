require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routers/userRoute');
const authRoutes = require('./routers/authRoute'); 
const roleRoutes = require('./routers/RoleRoute');
const Visitor = require('./routers/VisitorsRoutes');
const app= express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.get('/',(req,res)=>{
     res.send("hii")
})

// app.use('/api/visit',visitorEntryRoutes);
app.use('/api', roleRoutes);
app.use('/api/user',userRoute);
app.use('/api',Visitor);
app.use('/api/auth', authRoutes);

// app.use('/api/user',userRoute);

app.listen(PORT,()=>{
    console.log(`SERVER is running on  http://localhost:${PORT}`);
})