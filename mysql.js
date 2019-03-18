module.exports = function(app){

    var mysql = require('mysql2');
    
    //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
    var connection = mysql.createConnection({
        host : 'localhost',
        user:'user',
        database:'emails',
        password:'password'
        
    });
    
    /*
    connection.query(`UPDATE email SET op = '3' WHERE email = 'bielzitto97@gmail.com'`, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });*/

   connection.query('SELECT * FROM email' ,(err ,res)=>{
      // console.log(res[0].name);
      console.log(res);
        
    });
}