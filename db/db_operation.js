const mysql = require('mysql'); 
const random=require('random')
var request = require("request");

var con = mysql.createConnection({
    host: "localhost",
    user: "act_user",
    password: "Yohannes@hira123",
    database: "onboarding"
  });
  con.connect(function(err,res) {
    if(err) console.log(err) });


  const createUser=(req,res)=>{
      //console.log("this is create function")
      //res.send(req.body)

    var command = `INSERT INTO onbording.field_oficer(
        mobile_number,branch_code,first_name,midle_name,last_name,status_)
    values(
        '${req.body.mobile_number}',
        '${req.body.branch_code}',
        '${req.body.first_name}',
        '${req.body.midle_name}',
        '${req.body.last_name}',
        'inactive')`

    insertOperations(command, res,req);
  }
  
  function insertOperations(command,reres){
//    con.query(command, (err, result) =>{
//        if(err) res.send(err.code)
//        else{
//            //call other functions thatwill perform the OTP generations and registration
//        }
//   });

}
  function registerOTP(userNumber, res){

    sendOTP(userNumber,res)
  }
  function sendOTP(number,res){
      //res.send(number)
     var message='OTP='
     const value=random.int(100000 , 999999)
     message+= value;
      url=`http://10.1.125.99:13013/cgi-bin/sendsms?username=kan&password=kan&from=8404&to=${number}&text=${message}`
     const result= request({
         uri: url,
         method: "GET",
         timeout: 10000,
         followRedirect: true,
         maxRedirects: 10
       }, function(error, response, body) {
           if(error) {
         }
       });
   res.send({status:'success',message:'OTP sent to Registered Mobile Number',action:'Please Confirm The code'}) 
 }
  const OTP=(req,res)=>{
        var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";  
  }
  exports.userActivity={newUser:createUser}