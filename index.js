
const express = require('express')
const app = express()
const random = require('random')
const toxml=require('jsontoxml')
var convert = require('xml-js')
const xml2js = require('xml2js');



app.use(express.json())

const port = 3000
const customer=require('./customer/cretae_customer')
const users=require('./sec/user_account')
app.get('/api/login',(req,res)=>users.user_task.logins(req,res))
app.post('/api/opt',(req,res)=>users.user_task.authorizer(req,res))
app.post('/api/newuser',(req,res)=>{users.user_task.create(req,res)})

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/api/create_customer', (req, res) =>{
    let mobile_number=req.body.mobile_number
    req.body.messageId='MOB'+random.int(100000 , 999999)
    req.body.Mnemonic=req.body.full_name.substring(0,1)+mobile_number
    customer.customer_create(req,res)
   // res.send(req.body)
   
    console.log(req.body)
})

var json2xml = function(json, root, cb){
    var recursion = 0;
    var parents = [];
    var xml = '<?xml version="1.0" ?>';
    var isArray = function(obj) { return obj.constructor == Array; };
    
    var parseAttributes = function(node){
      for(key in node){
        var value = node[key];
        xml += ' ' + key +'="'+ value +'"';
      };
      xml += '>';
    };

    var parseNode = function(node, parentNode){
        recursion++;
        // Handle Object structures in the JSON properly
        if(!isArray(node)){
          xml += '<'+ parentNode;
          if(typeof node == 'object' && node['@']){
            parseAttributes(node['@']);
          } else {
            xml += '>';
          }
          for(key in node){
            var value = node[key];  
            // text values
            if(typeof value == 'string'){
              if(key === '#'){
                xml += value;
              } else {
                xml += '<'+ key +'>'+ value + '</'+key+'>';
              }
              
            }
            // is an object
            if(typeof value == 'object' && key != '@'){
              parseNode(node[key], key);
            }
          }
          recursion--;
          xml += '</'+ parentNode +'>';
        }
        
        // Handle array structures in the JSON properly
        if(isArray(node)){
          for(var i=0; i < node.length; i++){
            parseNode(node[i], parentNode);
          }
          recursion--;
        }s
        if (recursion === 0) { cb(xml); }
      };
      parseNode(json, root); // fire up the parser!
    };

app.post('/test',(req,res)=>{
    res.json(req.body)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))