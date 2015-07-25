/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/

var Fiber = Npm.require('fibers')

//var url = 'http://www.aetnanavigator.com/';
//var url2 = 'https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue';
//var urlfarmacy = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=PHARMACY&ajaxCall=true&fromDate=2008-01-01';
//var urlmedical = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=MED&fromDate=2008-01-01&claimFromHome=true ';
//var urldental = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=DEN&ajaxCall=true&fromDate=2008-01-01 ';

loadProviderData = function  (callback){
    var maindata ;
    var mainurl = 'https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue';
    var urlmedical = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=MED&fromDate=2008-01-01&claimFromHome=true ';

    var x =Xray();
//using nightmare

    setTimeout(function(){

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

                    // console.log(data);
                    console.log('entro final');
                    callback(null, {claims : data});
                    maindata = data;

                })
            })
            .run();

    },20000)
}


Meteor.methods({

    Update_user_Claims:  function(){
        var providerdata = Providers.findOne({user_id :  this.userId, provider_name: "aetna"});

        var LoadingClaims =  Meteor.wrapAsync(loadProviderData);

        var handlerequest = function(user_id){
            console.log("manejando " + user_id  );
            var doc = LoadingClaims();

            loadClaims(user_id, doc);
            //console.log(doc);

        }

        Fiber(function(){ handlerequest(providerdata.user_id)}).run();
        //Fiber(function(){ handlerequest(providerdata.user_id)}).run();
        //Fiber(function(){ handlerequest(providerdata.user_id)}).run();

    }

});


function loadClaims(user, data)
{
    console.log(user);
    data.claims.forEach(function(item){
        item.provider = "aetna";
        item.type = "Medical";
        HB_Profiles.update({user_id : user}, {$push : {  "claims" : item }});
    })

    console.log(data);

//db.getCollection('hb_profiles').update({user_id : "jXhjWo2ivqYDsgRcx"}, {$set : {claims : [{pedro : 1}]}})
    var currentprofile =  HB_Profiles.find({user_id : user}).fetch();

    console.log(currentprofile);
}

Meteor.startup(function () {
    //loadProviderData();
});