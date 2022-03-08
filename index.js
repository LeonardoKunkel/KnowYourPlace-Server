const express = require('express');
const app = express();

const connectDB = require('./config/database');
const cors = require('cors')

require('dotenv').config()

connectDB()

app.use(cors())

app.use(express.json({extended: true}))

app.use('/', require('./routes/index.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/reservs', require('./routes/reservs.routes'));

app.listen(process.env.PORT, () => console.log(`It's alive on port ${process.env.PORT}`))
