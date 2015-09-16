/**
 * Created by pdelacruz on 9/10/15.
 */
var Fiber = Npm.require('fibers')
var Future = Npm.require("fibers/future");

var x =Xray();

var provider_rate_data = [];
var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];
var mainurl2 = process.env["PROVIDERS_URL_AETNA_LOGIN_2"];
var urlmedical = process.env["PROVIDERS_URL_AETNA_MEDICAL"];
var urlpharmacy = process.env["PROVIDERS_URL_AETNA_PHARMACY"];
var urldental = process.env["PROVIDERS_URL_AETNA_DENTAL"];
var urlplandetails = "https://member.aetna.com/memberSecure/featureRouter/balances?product=medical&typecode=M";

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

var loadClaimData = function(user, provider, claimtype){
    return function(nightmare) {
        if(claimtype == "Medical"){
            nightmare
                .goto(urlmedical)
                .wait()
                .evaluate(function () {
                    return {
                        table: document.querySelector('html').outerHTML
                    };
                }, function (value) {
                    //console.log(value.table);
                    //medical
                    var dataexists = false;
                    //console.log(value.table);
                    if (value == null) {
                        //var htmltable =  value.errorTable ;
                        console.log('No HTML found on ' + secondurl);
                    } else {
                        var htmltable = value.table;
                        x(htmltable, 'table#sortTable')(function (err, table) {
                            if (table == '' || table == undefined) {
                                console.log('No medical data was found.');
                            } else {
                                dataexists = true;
                                console.log('table#sortTable was found for ' + urlmedical + ' scraping is next!');
                            }
                        });

                    }

                    if (dataexists) {
                        var htmltable = value.table;
                        console.log('Initiating scraping for ' + urlmedical)
                        //claimErrorTable
                        x(htmltable, 'table#sortTable tbody tr',
                            [{
                                date_of_service: 'td:nth-child(1)',
                                member: 'td:nth-child(2)',
                                facility: 'td:nth-child(3)',
                                status: 'td:nth-child(4)',
                                claim_amount: 'td:nth-child(5)',
                                paid_by_plan: 'td:nth-child(6)',
                                claim_detail_href: 'td:nth-child(7) a[href]@href'

                            }]
                        )(function (err, data) {

                            // console.log(data);
                            console.log('Wrapping up scraping for ' + urlmedical);

                            var newdata = {claimtype: 'Medical', claims: data};

                            loadClaims(user, provider,  newdata)
                            //future.return({claimtype: 'Medical', claims: data});
                        })
                    }
                    else {
                        //la data no existe imprimir el table error
                        console.log({datanoexists: "We found no claims in table#sortTable."}, {claims: []});

                    }
                })
        }
        else if(claimtype == "Dental") {
            nightmare
                .goto(urldental)
                .wait()
                .evaluate(function () {
                    return {
                        table: document.querySelector('html').outerHTML
                    };
                }, function (value) {
                    console.log('entro evaluate');

                    //validating the data
                    var dataexists = false;

                    if (value == null) {
                        //var htmltable =  value.errorTable ;
                        console.log('No HTML found on ' + urldental);
                    } else {
                        var htmltable = value.table;

                        x(htmltable, 'table#sortTable')(function (err, table) {
                            console.log(table) // Google
                            if (table == '' || table == undefined) {
                                console.log('No dental data was found.');
                            } else {
                                dataexists = true;
                                console.log('table#sortTable was found for ' + urldental + ' scraping is next!');
                            }
                        });
                        //console.log('la data existe ? ' + dataexists);
                    }

                    if (dataexists) {
                        var htmltable = value.table;
                        console.log('Initiating scraping for '+urldental)
                        x(htmltable, 'table#sortTable tbody tr',
                            [{
                                date_of_service: 'td:nth-child(1)',
                                member: 'td:nth-child(2)',
                                facility: 'td:nth-child(3)',
                                status: 'td:nth-child(4)',
                                claim_amount: 'td:nth-child(5)',
                                paid_by_plan: 'td:nth-child(6)',
                                claim_detail_href : 'td:nth-child(7) a[href]@href'

                            }]
                        )(function (err, data) {
                            // console.log(data);
                            console.log('Wrapping up scraping for '+secondurl);
                            //future.return({claimtype : 'Dental',claims: data});
                            var newdata = {claimtype : 'Dental',claims: data};

                            loadClaims(user, provider,  newdata)

                        })
                    } else {
                        //la data no existe imprimir el table error
                        console.log({datanoexists: "We found no claims in table#sortTable."}, {claims: []});

                    }
                })
        }
        else if(claimtype == "Pharmacy"){
            nightmare
                .goto(urlpharmacy)
                .wait()
                .evaluate(function () {
                    return {
                        table: document.querySelector('html').outerHTML
                    };
                }, function (value) {
                    //validating the data
                    var dataexists = false;

                    if (value == null) {
                        //var htmltable =  value.errorTable ;
                        console.log('No HTML found on ' + urlpharmacy);
                    } else {
                        var htmltable = value.table;

                        x(htmltable, 'table#sortTable')(function (err, table) {
                            if (table == '' || table == undefined) {
                                console.log('No pharmacy data was found.');
                            } else {
                                dataexists = true;
                                console.log('table#sortTable was found for ' + urlpharmacy + ' scraping is next!');
                            }
                        });
                        //console.log('la data existe ? ' + dataexists);
                    }

                    if (dataexists) {
                        var htmltable = value.table;
                        console.log('Initiating scraping for '+urlpharmacy)
                        x(htmltable, 'table#sortTable tbody tr',
                            [{
                                date_of_service: 'td:nth-child(1)',
                                member: 'td:nth-child(2)',
                                serviced_by: 'td:nth-child(3)@html',
                                prescription_number: 'td:nth-child(3)@html',
                                status: 'td:nth-child(4)',
                                drug_name: 'td:nth-child(5)',
                                prescription_cost: 'td:nth-child(6)',
                                paid_by_plan: 'td:nth-child(7)',
                                claim_detail_href : 'td:nth-child(8) a[href]@href'

                            }]
                        )(function (err, data) {
                            // console.log(data);
                            console.log('Wrapping up scraping for '+urlpharmacy);
                            //future.return({claimtype : 'Pharmacy', claims: data});
                            var newdata = {claimtype : 'Pharmacy', claims: data};
                            loadClaims(user, provider,  newdata)

                        })
                    } else {
                        //la data no existe imprimir el table error
                        console.log({datanoexists: "We found no claims in table#sortTable."}, {claims: []});

                    }
                })
        }else if(claimtype == "PlanDetails"){
            nightmare
                .goto(urlplandetails)
                .wait()
                .evaluate(function () {
                    var allhtml =  document.querySelector('html');

                    var members = document.querySelectorAll("#selectPullDown0 option");

                    var membersplan = [];
                    for(y=0; y < members.length; y++){
                        var normalsection= allhtml.querySelectorAll('.fundTable' +  y + ' tbody tr.normalSection');
                        var maindeductible = allhtml.querySelectorAll('.fundTable' +  y + ' tbody tr')[2].querySelectorAll('td')[1].textContent;


                        newarray = [];
                        for(i = 0; i < normalsection.length; i++){
                            // var data = {plan_name : }
                            var dataarray = normalsection[i].querySelectorAll('td');

                            var plantype = '';
                            var plan = dataarray[0].textContent;
                            var limit = dataarray[1].textContent;
                            var applied = dataarray[2].textContent;
                            var remainder = dataarray[3].textContent;

                            //get the subheadersection
                            var prev = normalsection[i].previousElementSibling

                            while(prev)
                            {
                                if(prev.className == "subSectionHeader")
                                {

                                    var header  = prev.querySelector('td');
                                    var validheader = header.textContent;
                                    validheader = validheader.replace(/(\r\n|\n|\r)/gm,"")
                                    validheader = validheader.replace(/\s/g,"");

                                    if(validheader == ""){
                                        plantype = ''
                                    }else
                                    {
                                        plantype =  header.textContent;
                                        break;
                                    }
                                }

                                prev = prev.previousElementSibling
                            }

                            newarray.push({plan_header: plantype, plan_name : plan, limit : limit, applied : applied, remainder : remainder});
                        }
                        membersplan.push({member : members[y].textContent, deductible :  maindeductible, plan_details : newarray});
                    }

                    return  membersplan;
                }, function (value) {

                    var newdata = {plan_summary: value};
                    console.log('data desde plandetails',newdata);
                    loadPlanDetails(user, newdata)
                    //future.return({plan_summary: alldata});
                })
        }

    }

}

Meteor.methods({

    "provider/refresh_user_data" : function (providername) {
        console.log('--------------------------------ReLoad process Initiated------------------------------------');

        var myuser_id = this.userId;
        var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: providername});

            //if(Claims.find({user_id :  this.userId}).count() == 0) {
        var future = new Future();

        new nightmare()
            .use(login(providerdata.provider_user_name, providerdata.provider_password, providerdata.login_type))
            .use(loadClaimData(myuser_id, "aetna", "Medical"))
            .use(loadClaimData(myuser_id, "aetna", "Dental"))
            .use(loadClaimData(myuser_id, "aetna", "Pharmacy"))
            .use(loadClaimData(myuser_id, "aetna", "PlanDetails"))
            .url(function () {
                future.return({status: "Done"});
            })
            .run();

        var result = future.wait();
    }

    //}
});

function loadClaims(user,provider,  data)
{
    Fiber(function(){
        if( data.claims != undefined) {

            if(data.claimtype == 'Medical') {
                console.log('Loading Medical Claims');
                data.claims.forEach(function (item) {
                    var claimid = '';

                    if(item.claim_detail_href != undefined){
                        claimid = s.replaceAll(_.last(item.claim_detail_href.split(',')), '"\\);', '');
                        claimid = s.replaceAll(claimid, '"', '');
                    }else{
                        claimid = 'N/A';
                    }

                    var claim = Claims.findOne({user_id : user, claim_id : s(claimid).trim().value(), status : s(item.status).trim().value()});

                    if(claim == undefined) {
                        Claims.insert({
                            user_id: user,
                            claim_id: s(claimid).trim().value(),
                            "type": data.claimtype,
                            "provider": provider,
                            "date_of_service": new Date(s(item.date_of_service).trim().value()),
                            "member": s.clean(item.member),
                            "facility": item.facility,
                            "status": s(item.status).trim().value(),
                            "claim_amount": Number(s(s.splice(s(item.claim_amount).trim().value(), 0, 1, "")).trim().value()) * 100,
                            "paid_by_plan": Number(s(s.splice(s(item.paid_by_plan).trim().value(), 0, 1, "")).trim().value()) * 100,
                            provider_rate: null,
                            personal_rate: null,
                            EOB: null
                        });
                    }
                })
            }

            if(data.claimtype == 'Dental') {
                console.log('Loading Dental Claims');
                data.claims.forEach(function (item) {
                    var claimid = '';
                    if(item.claim_detail_href != undefined){
                        claimid = s.replaceAll(_.last(item.claim_detail_href.split(',')), '"\\);', '');
                        claimid = s.replaceAll(claimid, '"', '');
                    }else{
                        claimid = 'N/A';
                    }

                    var claim = Claims.findOne({user_id : user, claim_id : s(claimid).trim().value(), status : s(item.status).trim().value()});

                    if(claim == undefined) {
                        Claims.insert({
                            user_id: user,
                            claim_id: s(claimid).trim().value(),
                            "type": data.claimtype,
                            "provider": provider,
                            "date_of_service": new Date(s(item.date_of_service).trim().value()),
                            "member": s.clean(item.member),
                            "facility": item.facility,
                            "status": s(item.status).trim().value(),
                            "claim_amount": Number(s(s.splice(s(item.claim_amount).trim().value(), 0, 1, "")).trim().value()) * 100,
                            "paid_by_plan": Number(s(s.splice(s(item.paid_by_plan).trim().value(), 0, 1, "")).trim().value()) * 100,
                            provider_rate: null,
                            personal_rate: null,
                            EOB: null

                        });
                    }
                })
            }

            if(data.claimtype == 'Pharmacy') {
                console.log('Loading Pharmacy Claims');
                data.claims.forEach(function (item) {
                    var claimiditem = item.claim_detail_href.split('&')[2];
                    var claimid = '';
                    if(claimiditem != undefined){
                        claimid = _.last(claimiditem.split('='));
                    }else{
                        claimid = 'N/A'
                    }
                    var prescriptionnumber = _.last(item.prescription_number.split('<br>'));
                    var servicedby = _.first(item.prescription_number.split('<br>'));

                    var claim = Claims.findOne({user_id : user, prescription_number : prescriptionnumber, status : s(item.status).trim().value()});

                    if(claim == undefined) {
                        Claims.insert({
                            user_id: user,
                            claim_id: s(claimid).trim().value(),
                            "type": data.claimtype,
                            "provider": provider,
                            "date_of_service": new Date(s(item.date_of_service).trim().value()),
                            "member": s.clean(item.member),
                            "serviced_by": servicedby,
                            "prescription_number": prescriptionnumber,
                            "status": s(item.status).trim().value(),
                            "drug_name": item.drug_name,
                            "prescription_cost": Number(s(s.splice(s(item.prescription_cost).trim().value(), 0, 1, "")).trim().value()) * 100,
                            "paid_by_plan": Number(s(s.splice(s(item.paid_by_plan).trim().value(), 0, 1, "")).trim().value()) * 100,
                            claim_detail_href: item.claim_detail_href,
                            provider_rate: null,
                            personal_rate: null,
                            EOB: null
                        });
                    }
                })
            }
        };
    }).run();
}

function loadPlanDetails(user, data){
    Fiber(function(){
        data.plan_summary.forEach(function(item){
            item.plan_details.forEach(function(value){
                console.log(item, value)
                //plan header ========================================================
                value.plan_header = s.replaceAll(value.plan_header, '\\n', '');
                value.plan_header = s.clean(value.plan_header);
                //plan name========================================================
                value.plan_name = s.replaceAll(value.plan_name, '\\n', '');
                value.plan_name = s.clean(value.plan_name);

                //limits========================================================
                var limit = s.replaceAll(value.limit, '\\n', '');
                limit = s.replaceAll(limit, ',', '');

                if(s.include(limit, '$')){
                    limit = Number(s(s.splice(s(limit).trim().value(),0,1,"")).trim().value()) * 100;
                }else{
                    limit = Number(limit) * 100;
                }

                value.limit = limit;

                //applied========================================================

                var applied = s.replaceAll(value.applied, '\\n', '');
                applied = s.replaceAll(applied, ',', '');
                applied = s.replaceAll(applied, 'Activity Details', '');


                if(s.include(applied, '$')){
                    applied = Number(s(s.splice(s(applied).trim().value(),0,1,"")).trim().value()) * 100;
                }else{
                    applied = Number(applied) * 100;
                }

                value.applied = applied;

                //remainder ========================================================

                var remainder = s.replaceAll(value.remainder, '\\n', '');
                remainder = s.replaceAll(remainder, ',', '');
                remainder = s.replaceAll(remainder, 'Activity Details', '');


                if(s.include(remainder, '$')){
                    remainder = Number(s(s.splice(s(remainder).trim().value(),0,1,"")).trim().value()) * 100;
                }else{
                    remainder = Number(remainder) * 100;
                }

                value.remainder = remainder;

                //console.log(value)
            });

            //insert member get the id

            var actualmember = Members.findOne({member_name : s.clean(item.member)});

            if(actualmember == undefined) {
                //deductible========================================================
                var deductible = s.replaceAll(item.deductible, '\\n', '');
                deductible = s.replaceAll(deductible, ',', '');
                deductible = s.replaceAll(deductible, 'Activity Details', '');


                if(s.include(deductible, '$')){
                    deductible = Number(s(s.splice(s(deductible).trim().value(),0,1,"")).trim().value()) * 100;
                }else{
                    deductible = Number(applied) * 100;
                }

                item.deductible = deductible;

                var memberid = Members.insert(
                    {
                        user_id: user,
                        member_name: s.clean(item.member),
                        deductible :  item.deductible,
                        plan_details: item.plan_details
                    })
            }
        });
    }).run();
}
