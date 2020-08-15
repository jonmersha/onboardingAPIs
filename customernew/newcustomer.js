const soapRequest=require('easy-soap-request')
var convert = require('xml-js');
const authorize=require('../customer/authorize_customer')
const url = 'http://10.1.250.157:9081/CUSONBRD/services';
const head = {
  'user-agent': 'CustomerCreation',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'http://10.1.250.157:9081/CUSONBRD/services?wsdl',
};
const customer=(req,res)=>{
res.send(req.body.messageId)
const customerSoap=`
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:poc="http://temenos.com/POC PROJECT" xmlns:cus="http://temenos.com/CUSTOMERETMBPOC">
   <soapenv:Header/>
   <soapenv:Body>
      <poc:CUSTOMERCREATION>     
	 <WebRequestCommon>
            <company>ET0010001</company>
            <password>1234567</password>
            <userName>CTSUSER1</userName>
         </WebRequestCommon>
         <OfsFunction>
         
   <activityName></activityName>

            <messageId>ID123433</messageId>
         </OfsFunction>
          <CUSTOMERETMBPOCType id="">
            <cus:Mnemonic>W944103738</cus:Mnemonic>
            <cus:gSHORTNAME g="1">
               <!--Zero or more repetitions:-->
               <cus:ShortName>WONDWESEN</cus:ShortName>
            </cus:gSHORTNAME>
            <!--Optional:-->
            <cus:gNAME1 g="1">
               <!--Zero or more repetitions:-->
               <cus:FullName>WONDWESEN YESHITLA</cus:FullName>
            </cus:gNAME1>
            <!--Optional:-->
      
            <!--Optional:-->
            <cus:gSTREET g="1">
               <!--Zero or more repetitions:-->
               <cus:Street>AFRICA AVENUE</cus:Street>
            </cus:gSTREET>
            <!--Optional:-->
            <cus:gLLADDRESS g="1">
               <!--Zero or more repetitions:-->
               <cus:mLLADDRESS m="1">
                  <!--Optional:-->
                  <cus:sgLLADDRESS sg="1">
                     <!--Zero or more repetitions:-->
                     <cus:Address s="1">
                        <!--Optional:-->
                        <cus:Address>ADDIS ABABA</cus:Address>
                     </cus:Address>
                  </cus:sgLLADDRESS>
               </cus:mLLADDRESS>
            </cus:gLLADDRESS>
            <!--Optional:-->
            <cus:gTOWNCOUNTRY g="1">
               <!--Zero or more repetitions:-->
               <cus:TownCiry>ADDIS</cus:TownCiry>
            </cus:gTOWNCOUNTRY>
            <!--Optional:-->
            <cus:gPOSTCODE g="1">
               <!--Zero or more repetitions:-->
               <cus:PostCode>12837</cus:PostCode>
            </cus:gPOSTCODE>
            <!--Optional:-->
            <cus:gCOUNTRY g="1">
               <!--Zero or more repetitions:-->
               <cus:Country>ETHIOPIA</cus:Country>
            </cus:gCOUNTRY>
            <!--Optional:-->
            <cus:Sector>1300</cus:Sector>
            <!--Optional:-->
            <cus:AccountOfficer></cus:AccountOfficer>
         

            <!--Optional:-->
            <cus:Industry>1311</cus:Industry>
            <!--Optional:-->
            <cus:Target>20</cus:Target>
            <!--Optional:-->
            <cus:Nationality>ET</cus:Nationality>
            <!--Optional:-->
            <cus:CustomerStatus>1</cus:CustomerStatus>
            <!--Optional:-->
            <cus:Residence>ET</cus:Residence>
            <!--Optional:-->
            <cus:gLEGALID g="1">
               <!--Zero or more repetitions:-->
               <cus:mLEGALID m="1">
                  <!--Optional:-->
                  <cus:LegalID>ID128</cus:LegalID>
                  <!--Optional:-->
                  <cus:DocumentName></cus:DocumentName>
                  <!--Optional:-->
                  <cus:NameonID>WONDWESEN YESHITLA</cus:NameonID>
                  <!--Optional:-->
                  <cus:IssueAuthority>ADDIS ABABA CITY</cus:IssueAuthority>
                  <!--Optional:-->
                  <cus:IssueDate>20170311</cus:IssueDate>
                  <!--Optional:-->
                  <cus:ExpirationDate>20190310</cus:ExpirationDate>
               </cus:mLEGALID>
            </cus:gLEGALID>
            <!--Optional:-->
            <cus:gOFFPHONE g="1">
               <!--Zero or more repetitions:-->
               <cus:PhoneNumbersOff>+2511115553456</cus:PhoneNumbersOff>
            </cus:gOFFPHONE>
            <!--Optional:-->
            <cus:DateofIncorp></cus:DateofIncorp>
            <!--Optional:-->
            <cus:Language>1</cus:Language>
            <!--Optional:-->
      
            <cus:Title>MR</cus:Title>
            <!--Optional:-->
            <cus:GivenNames>WONDWESEN YESHITLA BEKELE</cus:GivenNames>
           
            <cus:Gender>MALE</cus:Gender>
            <!--Optional:-->
            <cus:gPHONE1 g="1">
               <!--Zero or more repetitions:-->
               <cus:mPHONE1 m="1">
                
                  <cus:MobilePhoneNumbers>+251944103739</cus:MobilePhoneNumbers>
                  <!--Optional:-->
                  <cus:EmailAddress>WENDWESENYESH@GMAIL.COM</cus:EmailAddress>
               </cus:mPHONE1>
            </cus:gPHONE1>
         
         </CUSTOMERETMBPOCType>
		       </CUSTOMERETMBPOCType>
      </poc:CUSTOMERCREATION>
   </soapenv:Body>
</soapenv:Envelope>`

(async () => {
    try{
        const { response } = await soapRequest({ url: url, headers: head, xml: customerSoap, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
       //console.log(body)
        var results = convert.xml2json(body, {compact: true, spaces: 4});
        const json=JSON.parse(results)
        //console.log(json)

    //     const status=json["S:Envelope"]["S:Body"]["ns8:CUSTCREATEResponse"]["Status"]["successIndicator"]._text
    //     if(status=='T24Error'){
    //         console.log("Error Customer Creation ")
    //     }
    //     else{
    //     //console.log(json["S:Envelope"]["S:Body"]["ns8:CUSTCREATEResponse"]["CUSTOMERType"]._attributes.id)
    //     //authorize the customer
    //    // authorize.customer_auth(json["S:Envelope"]["S:Body"]["ns8:CUSTCREATEResponse"]["Status"]["transactionId"]._text)

    //     //and create accounts
    //     //authorize account crewations 
    // }
      }catch(error){
              //console.log(error)
    }
      })()
}
exports.customer_create=customer
