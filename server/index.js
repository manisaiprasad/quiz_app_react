const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('./configs/db-config');
const bookshelf = require('bookshelf')(db);
const securePassword = require('bookshelf-secure-password');
const bodyParser = require('body-parser');
bookshelf.plugin(securePassword);
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());

const User = bookshelf.Model.extend({
    tableName: 'users',
    hasSecurePassword: true
});

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const strategy = new JWTStrategy(opts, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    User.forge({ id: jwt_payload.id }).fetch().then(res => {
        next(null, res);
    })
});

passport.use(strategy);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.post('/signup',(req,res)=>{
    console.log(req);
    console.log(req.body);

    if (!req.body.username || !req.body.password || !req.body.email || !req.body.name) {
        res.status(400).send('Please provide username and password');
    }
    const user = new User({
        email: req.body.email,
        user_name: req.body.username,
        full_name: req.body.name,
        password: req.body.password
    });
    console.log(user);
    user.save().then(() => {
        res.send('User created successfully');
    });
})

app.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Welcome to the home page!');
});

app.post('/getToken', (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.password);
    if(!req.body.email || !req.body.password){
        res.status(401).send('Please provide username and password');
    }
    User.forge({ email: req.body.email }).fetch().then(user => {
        user.authenticate(req.body.password).then(() => {
            const payload = { id: user.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token });
        }).catch(err => {
            res.status(401).send('Invalid username or password');
        });
    });

});

app.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

app.get('/getQuizes', passport.authenticate('jwt', { session: false }),(req,res )=>{
    db.select('*').from('quiz').where('is_complete',1).then(quizes=>{
        res.json(quizes);
    })
})

app.get('/leaderboard/:quiz_id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log(req.params.quiz_id);
    console.log(req);
    db('quiz_results').join('users','quiz_results.user_id','=','users.id').join('quiz','quiz_results.quiz_id','=','quiz.id').select('*').where('quiz_id', req.params.quiz_id).orderBy('result','desc').then(leaderboard=>{
        res.json(leaderboard);
    }) 
})

app.get('/your_quizs',passport.authenticate('jwt',{session:false}),(req,res)=>{
    db('quiz').join('quiz_results','quiz.id','=','quiz_results.quiz_id').select('*').where('user_id', req.user.id).then(quiz => {
        res.json(quiz);
    })
})

app.get('your_quizs/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    db('quiz_answers').distinct().join('quiz_questions','quiz_answers.question_id','=','quiz_questions.question_id').join('quiz_results','quiz_answers.quiz_result_id','=','quiz_results.id').join('quiz','quiz_questions.quiz_id','=','quiz.id').select('*').where('quiz_result_id', req.params.id).then(quiz => {
        res.json(quiz);
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});