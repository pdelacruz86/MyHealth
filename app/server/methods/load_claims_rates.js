var Fiber = Npm.require('fibers')
var Future = Npm.require("fibers/future");

var x =Xray();

var provider_rate_data = [];
var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];
var mainurl2 = process.env["PROVIDERS_URL_AETNA_LOGIN_2"];
var urlmedical = process.env["PROVIDERS_URL_AETNA_MEDICAL"];
var urlpharmacy = process.env["PROVIDERS_URL_AETNA_PHARMACY"];
var urldental = process.env["PROVIDERS_URL_AETNA_DENTAL"];

var login = function(username, password, logintype){
    return function(nightmare) {
        nightmare
            .viewport(800, 1600)
            .goto("https://member.aetna.com/appConfig/login/login.fcc?TYPE=33554433&REALMOID=06-36d8cb4d-4ac1-44c7-b12d-a80fba4b718e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-jRs63Nsa3LlO0w8DBRJePrGDb%2fSrW4lCcEp3BCF2N5CYudNJWAZ6IAjtTBQZYxKV&TARGET=-SM-HTTPS%3a%2f%2fmember.aetna.com%2fMbrLanding%2fRoutingServlet%3fcreateSession%3dtrue")
            .type('input#userNameValue', username)
            .type('input#passwordValue', password)
            .click('#secureLoginBtn')
            .wait();

        if(logintype == "options"){
            nightmare
                .check("#planSponsorIndex")
                .wait()
                .click("#go-button label")
                .wait()
        }
    };
};

var getrates = function(claimtype, url, data) {
    return function(nightmare) {

        if (claimtype == "Pharmacy")
        {
            data.forEach(function(item){
                nightmare
                    .goto('https://member.aetna.com' + item.claim_detail_href)
                    .wait()
                    .url(function(url){console.log(url)})
                    .evaluate(function () {
                        return {
                            table: document.querySelector('#claimSummary').outerHTML
                        };
                    },
                    function (value) {
                        if (value == null) {
                            //var htmltable =  value.errorTable ;
                            //callback({error :"no hay dataa"}, null);

                        } else {
                            //validating the data
                            var htmltable = value.table;

                            x(htmltable, '#claimSummaryContent .rowData',
                                [{amountLabel: 'div.amountLabel'}])
                            (function (err, data) {
                                var newdata = {
                                    claim_id : item.claim_id,
                                    provider_rate : data[2].amountLabel
                                };
                                provider_rate_data.push(newdata);
                            });
                        }
                    })
            })

        }
        else
        {
            var rates = [];

            data.forEach(function(item){
                // console.log(item.claim_id)
                nightmare
                    .goto(url)
                    .wait()
                    .click('#sortTable a[href*="' + item.claim_id + '"]')
                    .wait()
                    .evaluate(function () {
                        return {
                            table: document.querySelector('#claimSummary').outerHTML
                        };
                    },
                    function (value) {
                        console.log('entro evaluate')
                            if (value == null) {
                                //var htmltable =  value.errorTable ;
                                // callback({error :"no hay dataa"}, null);

                            } else {
                                //validating the data
                                var htmltable = value.table;

                                x(htmltable, '#claimSummaryContent .rowData',
                                    [{amountLabel: 'div.amountLabel'}])
                                (function (err, data) {
                                    // console.log(data[2])
                                    var newdata = {
                                        claim_id : item.claim_id,
                                        provider_rate : data[2].amountLabel
                                    };

                                    provider_rate_data.push(newdata);
                                    // callback(null, {providerrate: data[2]});
                                });
                            }
                    })

            })
        }
    };
};


Meteor.methods({
    load_claims_rates_no_options :  function(){
        console.log('--------------------------------EMPEZO Carga provider rates------------------------------------');

        var myuser_id = this.userId;



        SyncedCron.add({
            name: 'Load claims details (provider rate)',
            schedule: function(parser) {
                // parser is a later.parse object
                return parser.text('every 2 minutes');
            },
            job: function() {
                var future = new Future();

            var medicalclaimlist = Claims.find({user_id : myuser_id, type : "Medical", provider_rate : null, status : "Completed"}, {skip: 0, limit: 15});
            var pharmacyclaimlist = Claims.find({user_id : myuser_id, type: "Pharmacy", provider_rate : null, status : "Completed"}, {skip: 0, limit: 15});
            var dentalclaimlist = Claims.find({user_id : myuser_id, type : "Dental", provider_rate : null, status : "Completed"}, {skip: 0, limit: 15});

                //console.log('claims count : ' + claimlist.count())

                //console.log(claimlist.fetch());

                if(medicalclaimlist.count() == 0 && pharmacyclaimlist.count() == 0 && dentalclaimlist.count() == 0){
                    SyncedCron.stop();
                }else {
                    var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: "aetna"});

                    new nightmare()
                        .use(login(providerdata.provider_user_name, providerdata.provider_password, providerdata.login_type))
                        .use(getrates("Medical", urlmedical, medicalclaimlist.fetch()))
                        .use(getrates("Pharmacy", urlpharmacy, pharmacyclaimlist.fetch()))
                        .use(getrates("Dental", urldental, dentalclaimlist.fetch()))
                        .url(function(){
                            future.return({rates: provider_rate_data});
                        })
                        .run();


                    var result = future.wait();

                    loadClaimsRateNoOptions(myuser_id, result);

                    console.log(result);

                }
            }
        });

        SyncedCron.start();
    }
})

function loadClaimsRateNoOptions(user,  data)
{
    data.rates.forEach(function(item){
        console.log(user, item)
        var value = Number(s(s.splice(s(item.provider_rate).trim().value(),0,1,"")).trim().value()) * 100;

        var fence = DDPServer._CurrentWriteFence.get();
        var write = fence.beginWrite();

        Claims.update({user_id : user, claim_id: item.claim_id}, {$set :{ provider_rate : value }});

        write.committed();

    })
}

Meteor.startup(function () {
    //SyncedCron.add({
    //    name: 'Load claims details (provider rate)',
    //    schedule: function(parser) {
    //        // parser is a later.parse object
    //        return parser.text('every 2 minutes');
    //    },
    //    job: function() {
    //        var future = new Future();
    //
    //        var medicalclaimlist = Claims.find({user_id : "pJE8e4otLnLjAvvmD", type : "Medical", provider_rate : null, status : "Completed"}, {skip: 0, limit: 2});
    //        //var pharmacyclaimlist = Claims.find({user_id : myuser_id, type: "Pharmacy", provider_rate : null, status : "Completed"}, {skip: 0, limit: 15});
    //        //var dentalclaimlist = Claims.find({user_id : myuser_id, type : "Dental", provider_rate : null, status : "Completed"}, {skip: 0, limit: 15});
    //
    //        //console.log('claims count : ' + claimlist.count())
    //
    //        //console.log(claimlist.fetch());
    //
    //        if(medicalclaimlist.count() == 0 && pharmacyclaimlist.count() == 0 && dentalclaimlist.count() == 0){
    //            SyncedCron.stop();
    //        }else {
    //            var providerdata = Providers.findOne({user_id :  "pJE8e4otLnLjAvvmD", provider_name: "aetna"});
    //
    //            new nightmare()
    //                  .use(login(providerdata.provider_user_name, providerdata.provider_password, providerdata.login_type))
    //                .use(getrates("Medical", urlmedical, medicalclaimlist.fetch()))
    //                //.use(getrates("Pharmacy", urlpharmacy, pharmacyclaimlist.fetch()))
    //                //.use(getrates("Dental", urldental, dentalclaimlist.fetch()))
    //                .url(function(){
    //                    future.return({rates: provider_rate_data});
    //                })
    //                .run();
    //
    //
    //            var result = future.wait();
    //
    //            loadClaimsRateNoOptions("pJE8e4otLnLjAvvmD", result);
    //
    //            console.log(result);
    //
    //        }
    //    }
    //});

    //SyncedCron.start();
});