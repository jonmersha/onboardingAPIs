const soapRequest=require('easy-soap-request')
var convert = require('xml-js');


const url = 'http://10.1.250.157:9081/CUSONBRD/services';
const head = {
  'user-agent': 'CustomerCreation',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://10.1.250.157:9081/CUSONBRD/services?wsdl',
};
const account_authorizations=(account_number)=>{
const accountAuthorizationSoap=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://temenos.com/CUSTONBRD">
<soapenv:Header/>
<soapenv:Body>
   <cus:ACCOUNTAUTH>
      <WebRequestCommon>
         <!--Optional:-->
         <company>ET0010001</company>
         <password>654321</password>
         <userName>MMTUSER1</userName>
      </WebRequestCommon>
      <!--Optional:-->
      <ACCOUNTAUTHType>
         <!--Optional:-->
         <transactionId>${account_number}</transactionId>
      </ACCOUNTAUTHType>
   </cus:ACCOUNTAUTH>
</soapenv:Body>
</soapenv:Envelope>
`;
(async () => {
    try{
        const { response } = await soapRequest({ url: url, headers: head, xml: accountAuthorizationSoap, timeout: 5000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
       //console.log(body)
        var results = convert.xml2json(body, {compact: true, spaces: 4});
        const json=JSON.parse(results)
        const status=json["S:Envelope"]["S:Body"]["ns8:ACCOUNTAUTHResponse"]["Status"]["successIndicator"]._text
        if(status=='T24Error'){
            
            console.log("Error Accpount Authorizations")
       }
         else{

     console.log(`Account Authorized\n \t ${json["S:Envelope"]["S:Body"]["ns8:ACCOUNTAUTHResponse"]["Status"]["transactionId"]._text}`)
     }
      }catch(error){
              console.log(error)
    }
      })()
}
exports.accountAuthorization=account_authorizations