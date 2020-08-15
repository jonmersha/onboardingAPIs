const soapRequest=require('easy-soap-request')
var convert = require('xml-js');
const create_account=require('../account/create_account')

const url = 'http://10.1.250.157:9081/CUSONBRD/services';
const head = {
  'user-agent': 'CustomerCreation',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://10.1.250.157:9081/CUSONBRD/services?wsdl',
};
const customer=(customer_id)=>{
const customerSoap=`
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://temenos.com/CUSTONBRD">
   <soapenv:Header/>
   <soapenv:Body>
      <cus:CUSTOMERAUTH>
         <WebRequestCommon>
                    <!--Optional:-->
                    <company>ET0010001</company>
                    <password>654321</password>
                    <userName>MMTUSER1</userName>
                </WebRequestCommon>
                <!--Optional:-->
         <CUSTOMERNAUType>
            <!--Optional:-->
            <transactionId>${customer_id}</transactionId>
         </CUSTOMERNAUType>
      </cus:CUSTOMERAUTH>
   </soapenv:Body>
</soapenv:Envelope>
`;


(async () => {
    try{
        const { response } = await soapRequest({ url: url, headers: head, xml: customerSoap, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
       //console.log(body)
        var results = convert.xml2json(body, {compact: true, spaces: 4});
        const json=JSON.parse(results)
        //console.log(json)
        const status=json["S:Envelope"]["S:Body"]["ns8:CUSTOMERAUTHResponse"]["Status"]["successIndicator"]._text
        //console.log(status)
         if(status=='T24Error'){
            console.log("Error Customer Authorizations")
           
           console.log(json["S:Envelope"]["S:Body"]["ns8:CUSTOMERAUTHResponse"]["Status"]["messages"]._text)
        }
       else{
        console.log(`Customer authorazed\n\t Customer ID=${json["S:Envelope"]["S:Body"]["ns8:CUSTOMERAUTHResponse"]["Status"]["transactionId"]._text}`)
        create_account.create_account(json["S:Envelope"]["S:Body"]["ns8:CUSTOMERAUTHResponse"]["Status"]["transactionId"]._text)
 
    }
      }catch(error){
              console.log(error)
    }
      })()

}
exports.customer_auth=customer