/**
 * Created by pdelacruz on 8/12/15.
 */
var Fiber = Npm.require('fibers')

//var
loadclaimsdetailsData = function  (user_id, providername, claimtype, claimID, callback){
    //set up user and pass by provider name

    //console.log(user_id, providername);

        var providerdata = Providers.findOne({user_id :  user_id, provider_name: providername});


    var secondurl = '';

    var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];
    var mainurl2 = process.env["PROVIDERS_URL_AETNA_LOGIN_2"];
    var urlmedical = process.env["PROVIDERS_URL_AETNA_MEDICAL"];
    var urlpharmacy = process.env["PROVIDERS_URL_AETNA_PHARMACY"];
    var urldental = process.env["PROVIDERS_URL_AETNA_DENTAL"];

    if(claimtype == 'Medical'){
        secondurl = urlmedical;
    }
    else if(claimtype == 'Pharmacy'){
        secondurl = urlpharmacy;
    }
    else if(claimtype == 'Dental'){
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
            //.click('#sortTable a[href*="' +  claimID + '"]')
            .click('#sortTable a[href*="E335L2T3B"]')
            .wait()
            .wait()
            .wait()
            .url(function(url){
                console.log(url);
            })
            .evaluate(function () {
                return {
                    table: document.querySelector('html').outerHTML
                };
            },
            function (value) {
                //console.log(value.table);
                console.log('entrooooooooo');
                if(claimtype == 'Medical') {
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
                else if(claimtype == 'Pharmacy') {
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
                else if(claimtype == 'Dental') {
                    console.log('entrooooooooo dental');

                    //validating the data
                    var htmltable = value.table;

                    x(htmltable, '#claimSummaryContent .rowData',
                        [ { amountLabel : 'div.amountLabel'}])
                    (function(err, data) {
                        console.log('entro final dental' + data[2]);
                        callback(null, {providerrate: data[2]});
                    });
                }
            })
            .run();

    },20000)
}

var LoadClaimsRatesData =  Meteor.wrapAsync(loadclaimsdetailsData);

Meteor.methods({
    load_claims_rates_with_options :  function(){
        console.log('--------------------------------EMPEZO Carga provider rates------------------------------------');

        var myuser_id = this.userId;

        var claimlist =  Claims.find({type : "Dental", provider_rate : null});

        //console.log(claimlist.fetch())

        var handlerequest = function(user_id, provider, claimtype, claimid){
            LoadClaimsRatesData(user_id, provider, claimtype, claimid, function(err, data){
                if(err){
                    console.log('HAY ERRORRRRRRRRRRRRRRRRRR');
                }else{
                    //loadClaims(user_id, provider, claimtype, data);
                }

            });
            //var data =  LoadClaimsData(user_id, provider, claimtype);
        }


        claimlist.forEach(function(value){
            Fiber(function(){ handlerequest(myuser_id, "aetna", "Dental", 'value.claim_id')}).run();
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