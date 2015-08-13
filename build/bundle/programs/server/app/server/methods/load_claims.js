(function(){var Fiber = Npm.require('fibers')

//var url = 'http://www.aetnanavigator.com/';
//var url2 = 'https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue';
//var urlfarmacy = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=PHARMACY&ajaxCall=true&fromDate=2008-01-01';
//var urlmedical = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=MED&fromDate=2008-01-01&claimFromHome=true ';
//var urldental = 'https://member.aetna.com/memberSecure/featureRouter/claims/medical?cmidx=All&product=DEN&ajaxCall=true&fromDate=2008-01-01';

loadProviderData = function  (user_id, providername, claimtype, callback){
    //set up user and pass by provider name

    var providerdata = Providers.findOne({user_id :  user_id, provider_name: providername});

    var secondurl = '';

    var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];
    var mainurl2 = process.env["PROVIDERS_URL_AETNA_LOGIN_2"];
    var urlmedical = process.env["PROVIDERS_URL_AETNA_MEDICAL"];
    var urlpharmacy = process.env["PROVIDERS_URL_AETNA_PHARMACY"];
    var urldental = process.env["PROVIDERS_URL_AETNA_DENTAL"];

    if(claimtype == 'medical'){
        secondurl = urlmedical;
    }
    else if(claimtype == 'pharmacy'){
        secondurl = urlpharmacy;
    }
    else if(claimtype == 'dental'){
        secondurl = urldental;
    }

    var x =Xray();

    Meteor.setTimeout(function(){
        var options = new nightmare()
            .goto(mainurl)
            .type('input#userNameValue', providerdata.provider_user_name)
            .type('input#passwordValue', providerdata.provider_password)
            .click('#secureLoginBtn')
            .wait()
            .wait()
            .wait()
            .goto(mainurl2)
            .wait()
            .wait()
            .wait()
            .check("#planSponsorIndex")
            .wait()
            .click("#go-button label")
            .wait()
            .wait()
            .wait()
            //.wait("#claimSearchSubmitButton")
            .goto(secondurl)
            //.wait("#sortTable")
            .wait()
            .wait()
            .evaluate(function () {
                return {
                    table: document.querySelector('html').outerHTML
                };
            },function (value) {
                //console.log(value.table);
                if(claimtype == 'medical') {
                    //validating the data
                    var dataexists = false;

                    if(value == null){
                        //var htmltable =  value.errorTable ;
                        console.log('Error pagina -- no html');
                    }else{
                        var htmltable =  value.table ;


                        x(htmltable, 'table#sortTable')(function(err, table) {
                            if(table == '' || table == undefined){
                                console.log('No clinical DATA');
                            }else {
                                dataexists = true;
                            }
                        });

                        console.log('la data existe ? ' + dataexists);
                    }

                    if(dataexists){
                    var htmltable = value.table;
                    //console.log(htmltable)
                    //claimErrorTable
                    x(htmltable, 'table#sortTable tbody tr',
                        [{
                            date_of_service: 'td:nth-child(1)',
                            member: 'td:nth-child(2)',
                            facility: 'td:nth-child(3)',
                            status: 'td:nth-child(4)',
                            claim_amount: 'td:nth-child(5)',
                            paid_by_plan: 'td:nth-child(6)'

                        }]
                    )(function (err, data) {

                        // console.log(data);
                        console.log('entro final medical');
                        callback(null, {claims: data});
                    })
                }
                    else
                    {
                        //la data no existe imprimir el table error
                        callback({ datanoexists : "We have no claims to show." }, {claims: []});

                    }
                }
                else if(claimtype == 'pharmacy') {
                    //validating the data
                    var dataexists = false;

                    if(value == null){
                        //var htmltable =  value.errorTable ;
                        console.log('Error pagina -- no html');
                    }else{
                        var htmltable =  value.table ;


                        x(htmltable, 'table#sortTable')(function(err, table) {
                            if(table == '' || table == undefined){
                                console.log('No farmacy DATA');
                            }else {
                                dataexists = true;
                            }
                        });

                        console.log('la data existe ? ' + dataexists);

                    }

                    if(dataexists){
                    var htmltable = value.table;
                    //console.log(htmltable)
                    x(htmltable, 'table#sortTable tbody tr',
                        [{
                            date_of_service: 'td:nth-child(1)',
                            member: 'td:nth-child(2)',
                            serviced_by: 'td:nth-child(3)',
                            prescription_number: 'td:nth-child(3)',
                            status: 'td:nth-child(4)',
                            drug_name: 'td:nth-child(5)',
                            prescription_cost: 'td:nth-child(6)',
                            paid_by_plan: 'td:nth-child(7)',

                        }]
                    )(function (err, data) {

                        // console.log(data);
                        console.log('entro final pharmacy');
                        callback(null, {claims: data});
                    })
                } else
                {
                    //la data no existe imprimir el table error
                    callback({ datanoexists : "We have no claims to show." }, {claims: []});

                }
                }
                else if(claimtype == 'dental'){
                    //validating the data
                    var dataexists = false;

                    if(value == null){
                        //var htmltable =  value.errorTable ;
                        console.log('Error pagina -- no html');
                    }else{
                        var htmltable =  value.table ;

                        x(htmltable, 'table#sortTable')(function(err, table) {
                            console.log(table) // Google
                            if(table == '' || table == undefined){
                                console.log('No dental DATA');
                            }else {
                                dataexists = true;
                            }
                        });

                        console.log('la data existe ? ' + dataexists);

                    }

                    if(dataexists){
                        var htmltable =  value.table ;

                        //console.log(htmltable)
                        x(htmltable, 'table#sortTable tbody tr',
                            [{
                                date_of_service: 'td:nth-child(1)',
                                member: 'td:nth-child(2)',
                                facility: 'td:nth-child(3)',
                                status: 'td:nth-child(4)',
                                claim_amount: 'td:nth-child(5)',
                                paid_by_plan: 'td:nth-child(6)'

                            }]
                        )(function (err, data) {

                            // console.log(data);
                            console.log('entro final dental');
                            callback(null, {claims: data});
                        })
                    }else
                    {
                        //la data no existe imprimir el table error
                        callback( null, {claims: []});

                    }
                }
            })
            .run();

    },30000)
}

var LoadClaimsData =  Meteor.wrapAsync(loadProviderData);


Meteor.methods({

    Update_user_Claims_old:  function(){
        console.log('--------------------------------EMPEZO ------------------------------------');
        var myuser_id = this.userId;

        var handlerequest = function(user_id, provider, claimtype){
           LoadClaimsData(user_id, provider, claimtype, function(err, data){
               if(err){
                   console.log('HAY ERRORRRRRRRRRRRRRRRRRR');
               }else{
                   loadClaims(user_id, provider, claimtype, data);
               }

            });

           //var data =  LoadClaimsData(user_id, provider, claimtype);
        }

        Fiber(function(){ handlerequest(myuser_id, "aetna", "medical")}).run();
        Fiber(function(){ handlerequest(myuser_id, "aetna", "dental")}).run();
        Fiber(function(){ handlerequest(myuser_id, "aetna", "pharmacy")}).run();

        //handlerequest(myuser_id, "aetna", "medical");
        //handlerequest(myuser_id, "aetna", "dental");
        //handlerequest(myuser_id, "aetna", "pharmacy");

    }
});


function loadClaims(user,provider, claimtype,  data)
{
    data.claims.forEach(function(item){
        item.provider = provider;
        item.type = claimtype;
        HB_Profiles.update({user_id : user}, {$push : {  "claims" : item }});
    })
}

Meteor.startup(function () {
    //loadProviderData();
});

})();
