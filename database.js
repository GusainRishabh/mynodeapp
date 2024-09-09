var mysql=require('mysql2');
var con=mysql.createConnection({host:"localhost",user:"root",password:"root"});
con.connect(function(err)
{
if(err) throw err;
console.log("connected");
con.query("create database mydemo1",function(err,result)
{
if(err) throw err;
console.log("Database created");
});
});