const soapRequest=require('easy-soap-request')
var convert = require('xml-js');
const rand=require('random')
const asccount=require('./account_uthorization')

const url = 'http://10.1.250.157:9081/CUSONBRD/services';
const head = {
  'user-agent': 'CustomerCreation',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://10.1.250.157:9081/CUSONBRD/services?wsdl',
};
const createAccount=(customerID)=>{
   // console.log('Account Sections '+customerID)
const accountSoap=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://temenos.com/CUSTONBRD" xmlns:acc="http://temenos.com/ACCOUNTOPENPOC">
<soapenv:Header/>
<soapenv:Body>
   <cus:ACCOUNTOPEN>
      <WebRequestCommon>
         <!--Optional:-->
         <company>ET0010001</company>
         <password>654321</password>
         <userName>MMTUSER1</userName>
      </WebRequestCommon>
      <OfsFunction>
         <messageId>${'mob'+rand.int(1000000,9999999)}</messageId>
      </OfsFunction>
      <ACCOUNTOPENPOCType id="">
         <acc:CustomerID>${customerID}</acc:CustomerID>
         <acc:ProductCode>6001</acc:ProductCode>
         <acc:Currency>ETB</acc:Currency>
         <acc:AccountOfficer></acc:AccountOfficer>
      </ACCOUNTOPENPOCType>
   </cus:ACCOUNTOPEN>
</soapenv:Body>
</soapenv:Envelope>
`;
(async () => {
    try{
        const { response } = await soapRequest({ url: url, headers: head, xml: accountSoap, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
       //console.log(body)
        var results = convert.xml2json(body, {compact: true, spaces: 4});
        const json=JSON.parse(results)
       const status=json["S:Envelope"]["S:Body"]["ns8:ACCOUNTOPENResponse"]["Status"]["successIndicator"]._text
      // console.log(status)
        if(status=='T24Error'){
            console.log("Error Account Creation ")
        }
        else{
            console.log(`Account Created  \n \t account number:=${json["S:Envelope"]["S:Body"]["ns8:ACCOUNTOPENResponse"]["Status"]["transactionId"]._text}`)
            asccount.accountAuthorization(json["S:Envelope"]["S:Body"]["ns8:ACCOUNTOPENResponse"]["Status"]["transactionId"]._text)
    }
      }catch(error){
              console.log(error)
    }
      })()
}
exports.create_account=createAccount