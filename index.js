const epxress = require('express');
const app = epxress();
const bdb = require('body-parser');
const jwt = require('jsonwebtoken');
const auth = require('./middlewere/auth');
app.set('view engine' , 'ejs');
app.use(bdb.urlencoded({extended : false}));
app.use(bdb.json());
app.use(epxress.static(__dirname + '/views'));
app.use(epxress.static(__dirname + "/views/pages/main"));
app.use(epxress.static(__dirname + "/views/pages/userpage"));
app.use(epxress.static(__dirname + "/views/pages/accessdeniedpage"));
app.get('/' , (req , res) => {
    res.render("pages/main/index")
})
app.post('/', auth , (req , res) => {
    console.log('body of post method');
})
app.get('/dashboard' , (req , res) => {
    res.render("pages/userpage/index");
})
app.get('/NoAccess' , (req , res) => {
    res.render("pages/accessdeniedpage");
})
app.listen(8080 , () => {
    console.log('server is runinng on 8080 port');
})