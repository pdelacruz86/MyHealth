/**
 * Created by pdelacruz on 7/22/15.
 */
//

//var url = 'http://www.aetnanavigator.com/';
//var url2 = 'https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue';
//var urlfarmacy = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=PHARMACY&ajaxCall=true&fromDate=2008-01-01';
//var urlmedical = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=MED&fromDate=2008-01-01&claimFromHome=true ';
//var urldental = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=DEN&ajaxCall=true&fromDate=2008-01-01 ';

function loadProviderData(providername, providerusername, providerpassword){
var mainurl = 'https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue';
var urlmedical = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=MED&fromDate=2008-01-01&claimFromHome=true ';

    var x =Xray();
//using nightmare
    var options = new nightmare()
        .goto(mainurl)
        .type('input#userNameValue', 'Tricia101851985')
        .type('input#passwordValue', 'Teamoabe0')
        .click('#secureLoginBtn')
        .wait()
        .wait()
        .wait("#claimSearchSubmitButton")
        //.screenshot('screens/shotaetna.png')
        .goto(urlmedical)
        .wait("#sortTable")
        //.screenshot('screens/shotaetnamedical.png')
        .evaluate(function () {
            return {
                table: document.querySelector('table#sortTable').outerHTML
            };
        },function (value) {
            var htmltable =  value.table ;
            console.log('entro evaluate');

            //console.log(htmltable)
            x(htmltable, 'tbody tr',
                [{
                    date_of_service : 'td:nth-child(1)',
                    member : 'td:nth-child(2)',
                    facility : 'td:nth-child(3)',
                    status : 'td:nth-child(4)',
                    claim_amount : 'td:nth-child(5)',
                    paid_by_plan : 'td:nth-child(6)'

                }]
            )(function(err, data){

                //console.log(data);

                data.forEach(function(index){
                    //parent
                    //index.userid = 'asdfjkl';

                    //documento hijo (claim) --- index
                    //HB_PROFILES.insert(index)

                    console.log(index);
                })


            })
        })
        .run();
}

function loadClaims(user, data)
{
    var newdata = JSON.parse(data);

    newdata.claims.forEach(function(item){
        item.provider = "aetna";
    })

    Profiles.insert({ "user_id": '"' + user[0]._id +'"', "claims" : newdata.claims });

    var currentprofile =  Profiles.find({"user_id" : '"' + user[0]._id +'"'}).fetch();

    console.log(currentprofile);
}

Meteor.startup(function () {
    //loadProviderData();
});