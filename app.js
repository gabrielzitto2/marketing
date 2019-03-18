//NAO EXECUTA CRON QUANDO ALL == OP == 6
//PROBLEMA DO TEMPO -> PARA QUALQUER EMAIL NOVO ENVIAR APOS UMA QUANTIDADE DE HORAS
//PRESTA ATENCAO SE N TA ENVIANDO EMAIL FORA DE HORA



var express = require('express');
var app = express();
var mysql = require('./mysql.js')(app);
var bodyparser = require('body-parser');

var nodemailer = require('nodemailer');


var mysql = require('mysql2');

var connection = mysql.createConnection({
    host : 'localhost',
    user:'user',
    database:'emails',
    password:'password'
    
});


app.use(bodyparser.urlencoded({extended:true}));

app.use('/modalEmail.js',express.static('modalEmail.js'));
app.set('view engine', 'ejs');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gabriellzitto@gmail.com',
      pass: 'skymatrix'
    }
  });

var min = new Date();
var min2 = min.getMinutes();

var a = "aaaaaaaa";
var b = "bbbbbbbbb";
var c = "cccccccc";
var d ="dddddddddd";
var e = "eeeeeeeeee";

function sendEmail(email, text){
    var mailOptions = {
        from: 'gabriellzitto@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: text
      };


      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
function uper(op,email){
    connection.query(`UPDATE email SET op = '${op}' WHERE email = '${email}'`, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
}
const CronJob = require('cron').CronJob;
const job = new CronJob('*/10 * * * * *', function() {
    connection.query('SELECT * FROM email' ,(err ,res)=>{
        for(var i = 0 ; i < res.length ; i++){
            var op = res[i].op ;
            var email = res[i].email;
            switch(op){
                case 1:
                    sendEmail(res[i].email,a);
                    uper(2,email);
                break;
                case 2:
                    sendEmail(res[i].email,b);
                    uper(3,email);
                break;
                case 3:
                    sendEmail(res[i].email,c);
                    uper(4,email);
                break;
                case 4:
                    sendEmail(res[i].email,d);
                    uper(5,email);
                break;
                case 5:
                    sendEmail(res[i].email,e);
                    uper(6,email);
                break;
            }

        }
        
    });
});


//job.start();

app.get('/', function(req,res){
    res.render("../tese");
});

app.post('/salvar', function(req,res){
    var date = req.body;
    var dados = "INSERT INTO email (name, email) VALUES ('"+date["name"]+"', '"+date["email"]+"')";
    connection.query(dados, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    //job.start();
    res.redirect('/');
  });
  
  
});

app.listen(3000,function(){
    console.log('Listening 3000');
});
