const express = require('express');
const http = require('http');
var mysql = require('mysql2');
var url = require("url");
const bcrypt = require('bcryptjs');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const app = express();
const router = express.Router();
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
var session = require('express-session')
const formidable = require('formidable');
const fs = require('fs');
// Correct order: require multer before using it
const multer = require('multer');
const sharp = require('sharp'); // Import sharp library

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// ... rest of your code


app.post('/checklogin', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select *from computer where salesPacage='" + a1 + "' and MOdelNumber='" + a2 + "'", function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                    req.session.user = { name: a1 };
                    res.writeHead(301, { Location: "http://localhost:3000/afterlogin.html" });
                    res.end();
                    //res.send("<div align ='center'><h2>Welcome......</h2><h2>"+result[0].salesPacage+"</h2></div><br><br><div align='center'></div><br><br><div align='center'>Register another user</a></div>");
                }
                else {
                    //res.send("<div align ='center'><h2>Invalid Userid And Password</h2><h2></h2></div><br><br><div align='center'>login</a></div><br><br><div align='center'>Register another user</a></div>");
                }
                console.log("Sucessfull");

            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});




//data base code end

















// show data codes  of VenderProfile



app.post('/showdata', async (req, res) => {
    try {
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select *from computer", function (err, result) {
                if (err) throw err;
                res.send("<div align ='center'><h2>Registration successful<br></h2><h2>" + result[0].salesPacage + "</h2></h2><h2>" + result[0].MOdelNumber + "</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
                console.log("Sucessfull");

            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});

//data base code end



app.post('/fetch', async (req, res) => {
    try {
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select *from computer", function (err, result) {
                if (err) throw err;
                res.send("<div align ='center'><h2>Successful<br></h2><table><tr><td><label><h2>Sales Package</h2></label></td><td>" + result[0].salesPacage + "</td><td><label><h2>Model Number</h2></label></td><td>" + result[0].MOdelNumber + "</td><td><h2>Seried</h2></td><td>" + result[0].Seried + "</td></tr><tr><td><label><h2>Color</h2></label></td><td>" + result[0].Color + "</td><td><label><h2>Type</label></td><td>" + result[0].Type + "</td><td><h2>SuitableFor</td><td>" + result[0].SuitableFor + "</td></tr><tr><td><label><h2>BatteryCell</h2></label></td><td>" + result[0].BatteryCell + "</td><td><label><h2>Msoffice</h2></label></td><td>" + result[0].Msoffice + "</td><td><h2>ProcessorAndMemoryFeatu</h2></td><td>" + result[0].ProcessorAndMemoryFeatu + "</td></tr></table ></div > <br><br><div align='center'><a href='./login.html'>login<div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>"); console.log("Sucessfull");

            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});

//data base code end





app.post('/login', async (req, res) => {
    try {
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {

            let submittedPass = req.body.password;
            let storedPass = foundUser.password;

            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                res.send("<div align='center'><h2>login successful</h2></div><br><br><br><div align='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>");
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {

            let fakePass = $2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga;
            await bcrypt.compare(req.body.password, fakePass);

            res.send("<div align='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch {
        res.send("Internal server error");
    }
});









// ComputerWeb codes here

app.post('/insertcomputerspecs', async (req, res) => {
    try {

        //Data bse code start
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;
        var a10 = req.body.t10;
        var a11 = req.body.t11;
        var a12 = req.body.t12;
        var a13 = req.body.t13;
        var a14 = req.body.t14;
        var a15 = req.body.t15;
        var a16 = req.body.t16;
        var a17 = req.body.t17;
        var a18 = req.body.t18;
        var a19 = req.body.t19;
        var a20 = req.body.t20;
        var a21 = req.body.t21;
        var a22 = req.body.t22;
        var a23 = req.body.t23;
        var a24 = req.body.t24;
        var a25 = req.body.t25;
        var a26 = req.body.t26;
        var a27 = req.body.t27;
        var a28 = req.body.t28;
        var a29 = req.body.t29;
        var a30 = req.body.t30;
        var a31 = req.body.t31;
        var a32 = req.body.t32;
        var a33 = req.body.t33;
        var a34 = req.body.t34;
        var a35 = req.body.t35;
        var a36 = req.body.t36;
        var a37 = req.body.t37;
        var a38 = req.body.t38;
        var a39 = req.body.t39;
        var a40 = req.body.t40;


        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("insert into computer values('" + a1 + "','" + a2 + "','" + a3 + "','" + a4 + "','" + a5 + "','" + a6 + "','" + a7 + "','" + a8 + "','" + a9 + "','" + a10 + "','" + a11 + "','" + a12 + "','" + a13 + "','" + a14 + "','" + a15 + "','" + a16 + "','" + a17 + "','" + a18 + "','" + a19 + "','" + a20 + "','" + a21 + "','" + a22 + "','" + a23 + "','" + a24 + "','" + a25 + "','" + a26 + "','" + a27 + "','" + a28 + "','" + a29 + "','" + a30 + "','" + a31 + "','" + a32 + "','" + a33 + "','" + a34 + "','" + a35 + "','" + a36 + "','" + a37 + "','" + a38 + "','" + a39 + "','" + a40 + "')", function (err, result) {
                if (err) throw err;
                console.log("sucessfull");

            });
        });
        //data base code end
        res.send("<div align='center'><h2>Sucessfull Regester</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
    } catch {
        res.send("Internal server error");
    }
});




app.post('/updatecomputerspecs', async (req, res) => {
    try {
        //Data bse code start
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;
        var a10 = req.body.t10;
        var a11 = req.body.t11;
        var a12 = req.body.t12;
        var a13 = req.body.t13;
        var a14 = req.body.t14;
        var a15 = req.body.t15;
        var a16 = req.body.t16;
        var a17 = req.body.t17;
        var a18 = req.body.t18;
        var a19 = req.body.t19;
        var a20 = req.body.t20;
        var a21 = req.body.t21;
        var a22 = req.body.t22;
        var a23 = req.body.t23;
        var a24 = req.body.t24;
        var a25 = req.body.t25;
        var a26 = req.body.t26;
        var a27 = req.body.t27;
        var a28 = req.body.t28;
        var a29 = req.body.t29;
        var a30 = req.body.t30;
        var a31 = req.body.t31;
        var a32 = req.body.t32;
        var a33 = req.body.t33;
        var a34 = req.body.t34;
        var a35 = req.body.t35;
        var a36 = req.body.t36;
        var a37 = req.body.t37;
        var a38 = req.body.t38;
        var a39 = req.body.t39;

        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("update computer set salesPacage='" + a1 + "',MOdelNumber='" + a2 + "',PartPacage ='" + a3 + "',Seried ='" + a4 + "',Color ='" + a5 + "',Type ='" + a6 + "', SuitableFor ='" + a7 + "',BatteryCell ='" + a8 + "',Msoffice ='" + a9 + "',ProcessorAndMemoryFeatures ='" + a10 + "',Dedicategraphicmemory ='" + a11 + "',DedicatememoryCapacity ='" + a12 + "',processorBrand ='" + a13 + "',processorName ='" + a14 + "',ProcessorGen ='" + a15 + "',Ssd ='" + a16 + "', SsdType ='" + a17 + "',Ram ='" + a18 + "',RamType ='" + a19 + "',ProcesserVariant ='" + a20 + "',ClockSpeed ='" + a21 + "',MemorySlots ='" + a22 + "',Expandablememory ='" + a23 + "',graphicProcesser ='" + a24 + "',OsArchitecture ='" + a25 + "',OperatingSystem ='" + a26 + "',SupportedOperatingSystem ='" + a27 + "',SystemArchitech ='" + a28 + "',TouchScreen ='" + a29 + "',ScreenSize ='" + a30 + "',ScreenResolution ='" + a31 + "',ScreenType ='" + a32 + "',RefreshRate ='" + a33 + "',WireLessLAN ='" + a34 + "',Bluetooth ='" + a35 + "',Dimensitons ='" + a36 + "',Weight ='" + a37 + "',ProductPrice ='" + a38 + "' where ProductCode='" + a39 + "'", function (err, result) {
                if (err) throw err;
                console.log("sucessfull");

            });
        });
        //data base code end
        res.send("<div align='center'><h2>Sucessfull Regester</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
    } catch {
        res.send("Internal server error");
    }
});







app.post('/deletecomputerspecs', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("delete from computer where productCode='" + a1 + "'", function (err, result) {
                res.writeHead(301, { Location: "http://localhost:3000/sucessful massgae.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


// All code of computer






app.post('/insertmobilespection', async (req, res) => {
    try {
        //Data bse code start
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;
        var a10 = req.body.t10;
        var a11 = req.body.t11;
        var a12 = req.body.t12;
        var a13 = req.body.t13;
        var a14 = req.body.t14;
        var a15 = req.body.t15;
        var a16 = req.body.t16;
        var a17 = req.body.t17;
        var a18 = req.body.t18;
        var a19 = req.body.t19;
        var a20 = req.body.t20;
        var a21 = req.body.t21;
        var a22 = req.body.t22;
        var a23 = req.body.t23;
        var a24 = req.body.t24;
        var a25 = req.body.t25;
        var a26 = req.body.t26;
        var a27 = req.body.t27;
        var a28 = req.body.t28;
        var a29 = req.body.t29;
        var a30 = req.body.t30;
        var a31 = req.body.t31;
        var a32 = req.body.t32;
        var a33 = req.body.t33;
        var a34 = req.body.t34;
        var a35 = req.body.t35;
        var a36 = req.body.t36;
        var a37 = req.body.t37;
        var a38 = req.body.t38;
        var a39 = req.body.t39;

        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("insert into mobile values('" + a1 + "','" + a2 + "','" + a3 + "','" + a4 + "','" + a5 + "','" + a6 + "','" + a7 + "','" + a8 + "','" + a9 + "','" + a10 + "','" + a11 + "','" + a12 + "','" + a13 + "','" + a14 + "','" + a15 + "','" + a16 + "','" + a17 + "','" + a18 + "','" + a19 + "','" + a20 + "','" + a21 + "','" + a22 + "','" + a23 + "','" + a24 + "','" + a25 + "','" + a26 + "','" + a27 + "','" + a28 + "','" + a29 + "','" + a30 + "','" + a31 + "','" + a32 + "','" + a33 + "','" + a34 + "','" + a35 + "','" + a36 + "','" + a37 + "','" + a38 + "','" + a39 + "')", function (err, result) {
                if (err) throw err;
                console.log("Sucessfull");
            });
            res.send("<div align='center'><h2>Sucessfull Add Phone details</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});



app.post('/updatemobilespection', async (req, res) => {
    try {
        //Data bse code start
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;
        var a10 = req.body.t10;
        var a11 = req.body.t11;
        var a12 = req.body.t12;
        var a13 = req.body.t13;
        var a14 = req.body.t14;
        var a15 = req.body.t15;
        var a16 = req.body.t16;
        var a17 = req.body.t17;
        var a18 = req.body.t18;
        var a19 = req.body.t19;
        var a20 = req.body.t20;
        var a21 = req.body.t21;
        var a22 = req.body.t22;
        var a23 = req.body.t23;
        var a24 = req.body.t24;
        var a25 = req.body.t25;
        var a26 = req.body.t26;
        var a27 = req.body.t27;
        var a28 = req.body.t28;
        var a29 = req.body.t29;
        var a30 = req.body.t30;
        var a31 = req.body.t31;
        var a32 = req.body.t32;
        var a33 = req.body.t33;
        var a34 = req.body.t34;
        var a35 = req.body.t35;
        var a36 = req.body.t36;
        var a37 = req.body.t37;
        var a38 = req.body.t38;
        var a39 = req.body.t39;

        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("update mobile set In_the_box='" + a1 + "',ModelNumber='" + a2 + "',ModelName ='" + a3 + "',color ='" + a4 + "',Simtype ='" + a5 + "',HybridSimSlot ='" + a6 + "', TouchScreen ='" + a7 + "',Otg_Compatible ='" + a8 + "',SoundEnhancements ='" + a9 + "',DisplayFeature ='" + a10 + "',Resolution ='" + a11 + "',ResulationType ='" + a12 + "',Gpu ='" + a13 + "',OtherDisplayFeatures ='" + a14 + "',OperatingSystem ='" + a15 + "',Processer_Brand  ='" + a16 + "', Processer_Type ='" + a17 + "',ProcesserCore  ='" + a18 + "',Operating_frequency ='" + a19 + "',PrimaryCameraAvailable ='" + a20 + "',PrimaryCamer ='" + a21 + "',Features ='" + a22 + "',OpticalZoom ='" + a23 + "',SecoundryCamera ='" + a24 + "',Flash ='" + a25 + "',HdRecording ='" + a26 + "',FullHd_Recording ='" + a27 + "',Videorecording ='" + a28 + "',DigitalZomm ='" + a29 + "',FrameRate ='" + a30 + "',CameraLens ='" + a31 + "',VideoCallSupport ='" + a32 + "',SpeakerPhone ='" + a33 + "',NetworkType ='" + a34 + "',SupportNetworks ='" + a35 + "',NFC ='" + a36 + "',SupportNetworks ='" + a37 + "',Browse_Type ='" + a38 + "' where productCode='" + a39 + "'", function (err, result) {
                if (err) throw err;
                console.log("Sucessfull");
            });
            res.send("<div align='center'><h2>Sucessfull Update</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


app.post('/deletemobile', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("delete from mobile where productCode='" + a1 + "'", function (err, result) {
                res.writeHead(301, { Location: "http://localhost:3000/sucessful massgae.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});




// customer create update delete


app.post('/customer', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            req.body.t5, salt);
        //data base code start
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;


        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("insert into customer values('" + a1 + "','" + a2 + "','" + a3 + "','" + a4 + "','" + a5 + "','" + a6 + "','" + a7 + "','" + a8 + "','" + a9 + "')", function (err, result) {
                if (err) throw err;
                console.log("sucessfull");

            });
        });
        //data base code end
        res.send("<div align='center'><h2>Sucessfull Regester</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
    } catch {
        res.send("Internal server error");
    }
});




app.post('/updatecustomer', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;


        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("update customer set userName='" + a1 + "', LastName='" + a3 + "',DateofBirth='" + a4 + "', Password='" + a5 + "', Address='" + a6 + "', State='" + a7 + "',pincode='" + a8 + "',LandMark='" + a9 + "' where UserId='" + a2 + "'", function (err, result) {
                res.writeHead(301, { Location: "http://localhost:3000/indexnew.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});

// delete customer
app.post('/deletecustomer', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("delete from customer where UserId='" + a1 + "'", function (err, result) {
                res.writeHead(301, { Location: "http://localhost:3000/sucessful massgae.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


// Vender 

app.post('/addvenderdetails', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;
        var a10 = req.body.t10;
        var a11 = req.body.t11;
        var a12 = req.body.t12;
        var a13 = req.body.t13;
        var a14 = req.body.t14;
        var a15 = req.body.t15;
        var a16 = req.body.t16;
        var a17 = req.body.t17;
        var a18 = req.body.t18;
        var a19 = req.body.t19;
        var a20 = req.body.t20;
        var a21 = req.body.t21;




        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("insert into venderinfo values('" + a1 + "','" + a2 + "','" + a3 + "','" + a4 + "','" + a5 + "','" + a6 + "','" + a7 + "','" + a8 + "','" + a9 + "','" + a10 + "','" + a11 + "','" + a12 + "','" + a13 + "','" + a14 + "','" + a15 + "','" + a16 + "','" + a17 + "','" + a18 + "','" + a19 + "','" + a20 + "','" + a21 + "')", function (err, result) {
                if (err) throw err;
                console.log("sucessfull");

            });
        });
        //data base code end
        res.send("<div align='center'><h2>Sucessfull Regester</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
    } catch {
        res.send("Internal server error");
    }
});

app.post('/updatevenderdetails', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;
        var a10 = req.body.t10;
        var a11 = req.body.t11;
        var a12 = req.body.t12;
        var a13 = req.body.t13;
        var a14 = req.body.t14;
        var a15 = req.body.t15;
        var a16 = req.body.t16;
        var a17 = req.body.t17;
        var a18 = req.body.t18;
        var a19 = req.body.t19;
        var a20 = req.body.t20;
        var a21 = req.body.t21;

        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("update venderinfo set CompanyName='" + a1 + "', TypeOfFirm='" + a2 + "', Country='" + a3 + "',StatusOfCompany='" + a5 + "', PanNo='" + a6 + "', SinNo='" + a7 + "', DinNo='" + a8 + "', DinN02='" + a9 + "', Address='" + a10 + "', City='" + a11 + "', State='" + a12 + "', pin='" + a13 + "' ,StdWithNo='" + a14 + "', Fax='" + a15 + "', Website='" + a16 + "', Mobile='" + a17 + "', NameOfContactPerson='" + a18 + "', DesignationOfContactPerson='" + a19 + "', IsYourFirm='" + a20 + "', BriefDescriptionOfBusness='" + a21 + "' where GST='" + a4 + "'", function (err, result) {
                res.writeHead(301, { Location: "http://localhost:3000/venderlogin.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


// delete vneder details



app.post('/deletevender', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("delete from venderinfo where GST='" + a1 + "'", function (err, result) {
                res.writeHead(301, { Location: "http://localhost:3000/sucessful massgae.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});



////


// Customer Login


app.post('/customerlogin', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from customer where UserId='" + a1 + "' and Password ='" + a2 + "'", function (err, result) {
                const fs = require('fs');

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/profile.json';
                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });

                if (result.length > 0) {
                    req.session.user = { User: a1 };
                    res.writeHead(301, { Location: "http://localhost:3000/dashboard.html" });
                    res.end();
                    //res.send("<div align='center'><h2>Welcome......</h2><h2>"+result[0].salesPacage+"</h2></div><br><br><div align='center'></div><br><br><div align='center'>Register another user</a></div>");
                }
                else {
                    res.send("<div align ='center'><h2>Invalid Userid And Password</h2><h2></h2></div><br><br><div align='center'>login</a></div><br><br><div align='center'>Register another user</a></div>");
                }
                console.log("Sucessfull");

            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


// vender login
app.post('/venderlogin', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from venderinfo where CompanyName='" + a1 + "' and GST ='" + a2 + "'", function (err, result) {
                const fs = require('fs');

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/vender.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                if (result.length > 0) {
                    req.session.user = { User: a1 };
                    res.writeHead(301, { Location: "http://localhost:3000/venderafterlogin.html" });
                    res.end();
                    //res.send("<div align='center'><h2>Welcome......</h2><h2>"+result[0].salesPacage+"</h2></div><br><br><div align='center'></div><br><br><div align='center'>Register another user</a></div>");
                }
                else {
                    res.send("<div align ='center'><h2>Invalid Userid And Password</h2><h2></h2></div><br><br><div align='center'>login</a></div><br><br><div align='center'>Register another user</a></div>");
                }
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});




app.post('/readjson1', async (req, res) => {
    try {
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from mobile", function (err, result) {
                if (err) throw err;
                const fs = require('fs');

                // Convert JSON data to a string
                const jsonString = JSON.stringify(result);

                // File path where you want to save the JSON data
                const filePath = 'public/mobile.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);

                });
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});




app.post('/computerspecs', async (req, res) => {
    try {
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select *from computer", function (err, result) {
                if (err) throw err;
                const fs = require('fs');

                // Convert JSON data to a string
                const jsonString = JSON.stringify(result);

                // File path where you want to save the JSON data
                const filePath = 'public/computer.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                if (result.length > 0) {

                    res.writeHead(301, { Location: "http://localhost:3000/computerspecs.html" });
                    res.end();
                    //res.send("<div align='center'><h2>Welcome......</h2><h2>"+result[0].salesPacage+"</h2></div><br><br><div align='center'></div><br><br><div align='center'>Register another user</a></div>");
                }
                else {
                    res.send("<div align ='center'><h2>Invalid Userid And Password</h2><h2></h2></div><br><br><div align='center'>login</a></div><br><br><div align='center'>Register another user</a></div>");
                }
                console.log("Sucessfull");

            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});











app.post('/imageuplode', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("insert into image values('" + a1 + "','" + a2 + "')", function (err, result) {
                if (err) throw err;
                http.createServer(function (req, res) {
                    let form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                        let filePath = file.upload.filePath;
                        let newPath = 'c:/mynodejs/Image';
                        newPath += file.fileupload.originalFileName;
                        fs.rename(filePath, newPath, function () {
                            res.write('Upload Image sucessfull')
                            res.end();
                        });
                    })
                })
                console.log("sucessfull");
            })
        });

        //data base code end
        res.send("<div align='center'><h2>Image Uplode Sucessfull </h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
    } catch {
        res.send("Internal server error");
    }
});












//data base code end



app.post('/getsession', async (req, res) => {
    try {
        let user = req.session.user;
        if (!user) {
            res.send("<h2>User Not found</h2>");
        }
        else {
            res.send(req.session.user.name);
            res.render('sess.html', { name: user.name });
        }
    } catch {
        res.send("Internal server error");
    }

});

//data base code end

router.get('/myuser', async (req, res) => {
    try {

        let user = req.session.user;
        if (!user) {
            res.send("<h2>User Not found</h2>");
        }
        else {
            res.send(req.session.user);
        }
    } catch {
        res.send("Internal server error");
    }

});



app.post('/searchdata', async (req, res) => {
    try {
        var t1 = req.body.t1;
        var t2 = req.body.c1;
        let x = "";
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from computer where salesPacage='" + t1 + "'", function (err, result) {
                const fs = require('fs');
                //result=result+t2;
                //t2="userId:'"+t2+"'";
                console.log(result);


                // console.log(t2);
                console.log(x);

                //console.log(result)
                // Convert JSON data to a string
                const jsonString = JSON.stringify(result);
                for (i = 0; i < jsonString.length - 2; i++) {
                    x = x + jsonString[i];
                }
                // Convert JSON data toa string
                let user = req.session.user;
                x = x + ",";
                x = x + "\"UserId\"";
                x = x + ":";
                x = x + "\"" + t2 + "\"" + "}]";

                // File path where you want to save the JSON data
                const filePath = 'public/searchdata.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, x, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });



                if (result.length > 0) {

                    res.writeHead(301, { Location: "http://localhost:3000/aftersearch.html" });
                    res.end();
                    //res.send("<div align='center'><h2>Welcome......</h2><h2>"+result[0].salesPacage+"</h2></div><br><br><div align='center'></div><br><br><div align='center'>Register another user</a></div>");
                }
                else {
                    res.send("<div align ='center'><h2>Invalid Userid And Password</h2><h2></h2></div><br><br><div align='center'>login</a></div><br><br><div align='center'>Register another user</a></div>");
                }
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


// cart section

app.post('/addcart', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var a2 = req.body.t2;
        var a3 = req.body.t3;
        var a4 = req.body.t4;
        var a5 = req.body.t5;
        var a6 = req.body.t6;
        var a7 = req.body.t7;
        var a8 = req.body.t8;
        var a9 = req.body.t9;
        var a10 = req.body.t10;
        var a11 = req.body.t11;
        var a12 = req.body.t12;
        var a13 = req.body.t13;
        var a14 = req.body.t14;
        var a15 = req.body.t15;
        var a16 = req.body.t16;
        var a17 = req.body.t17;
        var a18 = req.body.t18;
        var a19 = req.body.t19;
        var a20 = req.body.t20;
        var a21 = req.body.t21;
        var a22 = req.body.t22;
        var a23 = req.body.t23;
        var a24 = req.body.t24;
        var a25 = req.body.t25;
        var a26 = req.body.t26;
        var a27 = req.body.t27;
        var a28 = req.body.t28;
        var a29 = req.body.t29;
        var a30 = req.body.t30;
        var a31 = req.body.t31;
        var a32 = req.body.t32;
        var a33 = req.body.t33;
        var a34 = req.body.t34;
        var a35 = req.body.t35;
        var a36 = req.body.t36;
        var a37 = req.body.t37;
        var a38 = req.body.t38;
        var a39 = req.body.t39;
        var a40 = req.body.t40;
        var a41 = req.body.t41;
        var a42 = req.body.t42;




        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("insert into cartsec values('" + a1 + "','" + a2 + "','" + a3 + "','" + a4 + "','" + a5 + "','" + a6 + "','" + a7 + "','" + a8 + "','" + a9 + "','" + a10 + "','" + a11 + "','" + a12 + "','" + a13 + "','" + a14 + "','" + a15 + "','" + a16 + "','" + a17 + "','" + a18 + "','" + a19 + "','" + a20 + "','" + a21 + "','" + a22 + "','" + a23 + "','" + a24 + "','" + a25 + "','" + a26 + "','" + a27 + "','" + a28 + "','" + a29 + "','" + a30 + "','" + a31 + "','" + a32 + "','" + a33 + "','" + a34 + "','" + a35 + "','" + a36 + "','" + a37 + "','" + a38 + "','" + a39 + "','" + a40 + "','" + a41 + "','" + a42 + "')", function (err, result) {
                if (err) throw err;
                console.log("sucessfull");
                res.writeHead(301, { Location: "http://localhost:3000/sucessfullmassageaddcarr.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


/////

app.post('/myorder', async (req, res) => {
    try {
        var a1 = req.body.t2;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from cartsec where userId='" + a1 + "'", function (err, result) {
                const fs = require('fs');

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/myorder.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                console.log("sucessfull");
                res.writeHead(301, { Location: "http://localhost:3000/myorder.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});


//// venderorder



app.post('/venderorder', async (req, res) => {
    try {
        var a1 = req.body.c2;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from cartsec where CompanyName='" + a1 + "'", function (err, result) {
                const fs = require('fs');

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/venderorder.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                console.log("sucessfull");
                res.writeHead(301, { Location: "http://localhost:3000/venderoderlist.html" });
                res.end();
                console.log("Sucessfull");
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});






/// json of viewdetails
app.post('/updatestatus', async (req, res) => {
    try {
        var a1 = req.body.t1;
        
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            
            con.query("select * from cartsec where Seried='" + a1 + "'", function (err, result) {
                const fs = require('fs');
               

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/updatestatus.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                console.log("sucessfull");
                res.writeHead(301, { Location: "http://localhost:3000/venderorderfulldetails.html" });
                res.end();
                console.log("Sucessfull");
                
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});
//// update code

app.post('/statusupdate', async (req, res) => {
    try {
        //Data bse code start
        var a1 = req.body.t42;
        var a2 = req.body.t4;


        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("update cartsec set status='" + a1 + "' where Seried='" + a2 + "'", function (err, result) {
                if (err) throw err;
                console.log("sucessfull");

            });
        });
        //data base code end
        res.send("<div align='center'><h2>Sucessfull Regester</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
    } catch {
        res.send("Internal server error");
    }
});




// order status


app.post('/vieworderstatus', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from cartsec where status='" + a1 + "'", function (err, result) {
                const fs = require('fs');

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/myorderstatus.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                console.log("sucessfull");
                res.writeHead(301, { Location: "http://localhost:3000/myorderstatus.html" });
                res.end();
                console.log("Sucessfull");
            });
            
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});

//// view details fro customer


app.post('/orderstatusbycustomer', async (req, res) => {
    try {
        var a1 = req.body.t1;
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            con.query("select * from cartsec where status='" + a1 + "'", function (err, result) {
                const fs = require('fs');

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/myorderstatus.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                console.log("sucessfull");
                res.writeHead(301, { Location: "http://localhost:3000/myorderstatus.html" });
                res.end();
                console.log("Sucessfull");
            });
            
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});



app.post('/viewdetail', async (req, res) => {
    try {
        var a1 = req.body.t1;
        
        var con = mysql.createConnection({ host: "localhost", user: "root", password: "root", database: "computer" });
        con.connect(function (err) {
            if (err) throw err;
            console.log("connected");
            
            con.query("select * from cartsec where Seried='" + a1 + "'", function (err, result) {
                const fs = require('fs');
               

                // Convert JSON data to a string
                let user = req.session.user;


                let jsonString = JSON.stringify(result);


                // File path where you want to save the JSON data
                const filePath = 'public/viewmore.json';

                // Write the JSON string to the file
                fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('JSON data has been saved to', filePath);
                });


                console.log("sucessfull");
                res.writeHead(301, { Location: "http://localhost:3000/viewmoredetail.html" });
                res.end();
                console.log("Sucessfull");
                
            });
        });
        //data base code end
    } catch {
        res.send("Internal server error");
    }
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/ACER/mynodejs/Image') // Uploads directory
    },
    filename: function (req, file, cb) {
      // Save the file with its original name
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  
  // Route for file upload
  app.post('/upload', upload.single('image'), (req, res) => {
    // Convert the uploaded image to JPG format
    const inputPath = path.join(__dirname, 'Image', req.file.filename);
    const outputPath = path.join(__dirname, 'uploads', `${path.parse(req.file.filename).name}.jpg`);
    
    sharp(inputPath)
      .toFormat('jpeg')
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error converting file format');
        } else {
          console.log('Image converted to JPEG successfully');
          res.send('File uploaded and converted to JPG successfully');
        }
      });
  });
  





server.listen(3000, function () {
    console.log("server is listening on port: 3000");
});