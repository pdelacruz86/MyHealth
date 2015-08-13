(function(){/**
 * Created by pdelacruz on 8/12/15.
 */
var Fiber = Npm.require('fibers')

//var
loadclaimsdetailsData = function  (user_id, providername, claimtype, callback){
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
            .wait("#secureLoginBtn")
            .type('input#userNameValue', providerdata.provider_user_name)
            .type('input#passwordValue', providerdata.provider_password)
            .click('#secureLoginBtn')
            .wait(20000)
            .check("#planSponsorIndex")
            .click("#go-button label")
            .wait()
            .wait(25000)
            .goto(secondurl)
            .wait()
            .wait()
            .wait()
            .evaluate(function () {
                return {
                    table: document.querySelector('html').outerHTML
                };
            },
            function (value) {
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
                else if(claimtype == 'dental') {
                    //validating the data
                    var htmltable = value.table;

                    //console.log(htmltable)
                    x(htmltable, 'table#sortTable tbody tr',
                        [{
                            provider_rate: 'td:nth-child(1)',
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

                }
            })
            .run();

    },30000)
}

var LoadClaimsRatesData =  Meteor.wrapAsync(loadclaimsdetailsData);

Meteor.methods({
    load_claims_rates_with_options :  function(){

        var claimlist =  Claims.find({type : "Dental", provider_rate : null});

        var handlerequest = function(user_id, provider, claimtype){
            LoadClaimsRatesData(user_id, provider, claimtype, function(err, data){
                if(err){
                    console.log('HAY ERRORRRRRRRRRRRRRRRRRR');
                }else{
                    loadClaims(user_id, provider, claimtype, data);
                }

            });
            //var data =  LoadClaimsData(user_id, provider, claimtype);
        }


        claimlist.forEach(function(value){
            Fiber(function(){ handlerequest(myuser_id, "aetna", "medical")}).run();
        })



    },
    load_claims_rates_no_options :  function(){



    }
})


function loadClaimsRate(user,provider, claimtype,  data)
{

}



Meteor.startup(function () {

    var claimlist =  Claims.find({type : "Dental", provider_rate : null});

    //console.log(claimlist.fetch());

    claimlist.forEach(function(value){
        console.log(value.claim_id)

    })
});

})();
