'use strict';

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let userController = require('./controllers/user_controller');
let scoringController=require('./controllers/scoring_controller');
let scoring5Controller=require('./controllers/scoring_5_management_controller');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.send('Back and karidit');
});

//users
app.get('/users', userController.getUsers);
app.post('/login', userController.getUser);
app.post('/new/user', userController.saveUser);
app.delete('/DeletUser', userController.DeleteUser);
app.put('/UpdateUser', userController.UpdateUser);


app.post('/scoring/indosat_auto', scoringController.score_indosat_auto);
app.post('/scoring/indosat_micro', scoringController.score_indosat_micro);
app.post('/scoring/indosat_payday', scoringController.score_indosat_payday);
app.post('/scoring/indosat_sample', scoringController.score_indosat_sample);
app.post('/scoring/indosat_SME', scoringController.score_indosat_SME);
app.post('/scoring/indosat_whitegood', scoringController.score_indosat_whitegood);


app.post('/scoring/BSM', scoring5Controller.score_BSM);
app.post('/scoring/Modal_Antara', scoring5Controller.score_Modal_Antara);
app.post('/scoring/Investree_Invoicing', scoring5Controller.score_Investree_Invoicing);
app.post('/scoring/Mandala_F_Score', scoring5Controller.score_Mandala_F_Score);
app.post('/scoring/Mandala_G_Score', scoring5Controller.score_Mandala_G_Score);
app.post('/scoring/BYB', scoring5Controller.score_BYB);
app.post('/scoring/Indofund', scoring5Controller.score_Indofund);

module.exports = app;