const soapRequest=require('easy-soap-request')
var convert = require('xml-js');
const authorize=require('./authorize_customer')
const url = 'http://10.1.245.157:9083/CUSONBRD/services';
const head = {
  'user-agent': 'CustomerCreation',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://10.1.245.157:9083/CUSONBRD/services?wsdl',
};
const customer=(req,res)=>{
res.send(req.body.messageId)
const customerSoap=`
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://temenos.com/CUSTONBRD" xmlns:cus1="http://temenos.com/CUSTOMERINPUT">
        <soapenv:Header/>
        <soapenv:Body>
            <cus:CUSTCREATE>
                <WebRequestCommon>
                    <company>ET0010001</company>
                    <password>654321</password>
                    <userName>MMTUSER1</userName>
                </WebRequestCommon>

                <OfsFunction>
                    <messageId>${req.body.messageId}</messageId>
                </OfsFunction>
                <CUSTOMERINPUTType id="">
                    <cus1:Mnemonic>${req.body.Mnemonic}</cus1:Mnemonic>
                    <cus1:gSHORTNAME g="1">
                        <cus1:ShortName>${req.body.short_name}</cus1:ShortName>
                    </cus1:gSHORTNAME>
                    <cus1:gNAME1 g="1">
                        <cus1:FullName>${req.body.full_name}</cus1:FullName>
                    </cus1:gNAME1>
                    <cus1:Sector>${req.body.sector}</cus1:Sector>
                    <cus1:Industry>${req.body.industry}</cus1:Industry>
                    <cus1:Target>20</cus1:Target>
                    <cus1:Nationality>${req.body.nationality}</cus1:Nationality>
                    <cus1:Residence>${req.body.residence}</cus1:Residence>
                    <cus1:Language>1</cus1:Language>
                    <cus1:TITLE>${req.body.title}</cus1:TITLE>
                    <cus1:GIVENNAMES>${req.body.given_name}</cus1:GIVENNAMES>
                    <cus1:Gender>${req.body.gender}</cus1:Gender>
                    <cus1:MaritalStatus>${req.body.marital_status}</cus1:MaritalStatus>
                    </CUSTOMERINPUTType>

            </cus:CUSTCREATE>
        </soapenv:Body>
        </soapenv:Envelope>
`;


(async () => {
    try{
        
        const { response } = await soapRequest({ url: url, headers: head, xml: customerSoap, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
       // console.log(response)
        var results = convert.xml2json(body, {compact: true, spaces: 4});
        const json=JSON.parse(results)
         let json2=json['S:Envelope']["S:Body"]
         

         let CUSTCREATEResponse=''
                for(var obj in json2){
                    CUSTCREATEResponse=obj
                }
        console.log(CUSTCREATEResponse)
        const status=json2[CUSTCREATEResponse].Status.successIndicator._text
        
        
        console.log(status)
        if(status=='T24Error'){
            const message=json2[CUSTCREATEResponse].Status.messages._text
            console.log("Error Customer Creation :   "+message)
        }
        else{
        console.log(`Customer Created Successfully \n \t Customer ID =${json2[CUSTCREATEResponse].Status.transactionId._text}`)
       
        authorize.customer_auth(json2[CUSTCREATEResponse].Status.transactionId._text) 
    }
      }catch(error){
              console.log(error)
    }
      })()
}
exports.customer_create=customer