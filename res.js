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
    var f=q.t6;
    var g=q.t7;
    var h=q.t8;
    var i=q.t9;
    var j=q.t10;
    var k=q.t11;
    var l=q.t12;
    var m=q.t13;
    var n=q.t14;

var con=mysql2.createConnection({host:"localhost",user:"root",password:"root",database:"mydemo1"});
con.connect(function(err)
{
if(err) throw err;
console.log("connected");
var sqlcmd="insert into restrunt values('"+a+"','"+b+"','"+c+"','"+d+"','"+e+"' ,'"+f+"', '"+g+"', '"+h+"','" +i+"','" +j+"','" +k+"','" +l+"','" +m+"','" +n+"')";
con.query(sqlcmd,function(err,result)
{
if(err) throw err;
console.log("Database created");
});
});
res.end();
}).listen(8080)