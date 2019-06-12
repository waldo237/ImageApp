const config = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {json } = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//middleware
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req,res, next)=>{ 
	err.status(500).send(err); next();
});

//routes
const users = require('./routes/api/userAPI');
const images = require('./routes/api/imageAPI');
const products = require('./routes/api/productAPI');
const signIn = require('./routes/api/signInAPI');

app.use('/api/users/',users);
app.use('/api/images/',images);
app.use('/api/products/',products);
app.use('/api/signin/',signIn);


// check if the jwtPrivateKey is set, otherwise turn off the app
if (!process.env.JWTTOKEN) {
	console.error('FATAL ERROR: jwtPrivateKey is not defined.');
	process.exit(1);
}

//connect to mongoDB
mongoose.connect(process.env.DB_PASS
	, { useNewUrlParser: true })
	.then(() => console.log('connected to DataBase successfully!'))
	.catch(err => console.log(`Could not connect to DataBase: ${err}`));


const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`listening on port ${port}`));
