
//BUILD
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

//EXECUTE
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
	  ssl:true,
  }
});

const app = express();


//ROUTE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

		//Root
	app.get('/', (req,res) => { res.json('Working') });

		//Signin
	app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

		//Register
	app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

		//Profile
	app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

	//Image
	app.put('/image', (req, res) => { image.handleImage(req, res, db)})
	app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


//RESPOND
app.listen(process.env.PORT || 3000, () => {
	console.log(`Running: PORT ${process.env.PORT}`);
});

