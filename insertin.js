var mysql2=require('mysql2');
var http=require('http');
var url=require('url');
http.createServer(function(req,res){
 res.writeHead(200,{'Contant-Type':'text/html'});
 q=url.parse(req.url,true).query;
    var a=q.t1;
    var b=q.t2;
    var c=q.t3;
    var d=q.t4;
    var e=q.t5;
var con=mysql2.createConnection({host:"localhost",user:"root",password:"root",database:"mydemo1"});
con.connect(function(err)
{
if(err) throw err;
console.log("connected");
var sqlcmd="insert into mydemo1 values('"+a+"','"+b+"','"+c+"','"+d+"','"+e+"')";
con.query(sqlcmd,function(err,result)
{
if(err) throw err;
console.log("Database created");
});
});
res.write("Name="+a+""+b+""+c+""+d+""+e);
res.end();
}).listen(8080)