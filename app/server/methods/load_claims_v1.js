if (Meteor.isServer) {
    var Fiber = Npm.require('fibers')
    var Future = Npm.require("fibers/future");

    Meteor.methods({

        Update_user_Claims: function (n, providername) {
            console.log('--------------------------------Loading process Initiated------------------------------------');

            var myuser_id = this.userId;
            var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: providername});

            // build a range of tasks from 0 to n-1
            var range = _.range(n);
            
            // iterate sequentially over the range to launch tasks
            var futures = _.map(range, function (index) {
            var future = new Future();
            console.log("Setting up tasks for index #", index);            
            // simulate an asynchronous HTTP request using a setTimeout
            var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];
            var mainurl2 = process.env["PROVIDERS_URL_AETNA_LOGIN_2"];
            var urlmedical = process.env["PROVIDERS_URL_AETNA_MEDICAL"];
            var urlfarmacy = process.env["PROVIDERS_URL_AETNA_PHARMACY"];
            var urldental = process.env["PROVIDERS_URL_AETNA_DENTAL"];;
            var secondurl = '';

            var x = Xray();

            if (index == 0) {
                secondurl = urlmedical;
            }
            else if (index == 1) {
                secondurl = urlfarmacy;
            }
            else if (index == 2) {
                secondurl = urldental;
            }
            //console.log('--------------------------------Going to Main URL--------------------------------------------');
            Meteor.setTimeout(function () {
            var options = new nightmare()
                .goto(mainurl)
                .wait("#secureLoginBtn")
                .type('input#userNameValue', providerdata.provider_user_name)
                .type('input#passwordValue', providerdata.provider_password)
                .click('#secureLoginBtn')
                .wait()
            //console.log('--------------------------------Clicked: #secureLoginBtn-------------------------------------');
                //.wait("#claimSearchSubmitButton")
                //.wait(20000)
            //console.log('--------------------------------Going to Second URL------------------------------------------');
                .goto(secondurl)
                .wait()
                .evaluate(function () {
                    return {
                        table: document.querySelector('html').outerHTML
                    };
                }, function (value) {
                    //console.log(value.table);
                    //medical
                        if (index == 0) {
                            //validating the data
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
                                        console.log('table#sortTable was found for ' + secondurl + ' scraping is next!');
                                    }
                                });
                                
                            }

                        if (dataexists) {
                            var htmltable = value.table;
                            console.log('Initiating scraping for '+ secondurl)
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
                                console.log('Wrapping up scraping for '+secondurl);
                                future.return({claimtype : 'Medical', claims: data});
                            })
                        }
                        else {
                            //la data no existe imprimir el table error
                            future.return({datanoexists: "We found no claims in table#sortTable."}, {claims: []});

                        }
                    }
                    else if (index == 1) {
                        //validating the data
                        var dataexists = false;

                        if (value == null) {
                            //var htmltable =  value.errorTable ;
                            console.log('No HTML found on ' + secondurl);
                        } else {
                            var htmltable = value.table;

                            x(htmltable, 'table#sortTable')(function (err, table) {
                                if (table == '' || table == undefined) {
                                    console.log('No pharmacy data was found.');
                                } else {
                                    dataexists = true;
                                    console.log('table#sortTable was found for ' + secondurl + ' scraping is next!');
                                }
                            });
                            //console.log('la data existe ? ' + dataexists);
                        }

                        if (dataexists) {
                            var htmltable = value.table;
                            console.log('Initiating scraping for '+secondurl)
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
                                console.log('Wrapping up scraping for '+secondurl);
                                future.return({claimtype : 'Pharmacy', claims: data});
                            })
                        } else {
                            //la data no existe imprimir el table error
                            future.return({datanoexists: "We found no claims in table#sortTable."}, {claims: []});

                        }
                    }
                    else if (index == 2) {
                        //validating the data
                        var dataexists = false;

                        if (value == null) {
                            //var htmltable =  value.errorTable ;
                            console.log('No HTML found on ' + secondurl);
                        } else {
                            var htmltable = value.table;

                            x(htmltable, 'table#sortTable')(function (err, table) {
                                console.log(table) // Google
                                if (table == '' || table == undefined) {
                                    console.log('No dental data was found.');
                                } else {
                                    dataexists = true;
                                    console.log('table#sortTable was found for ' + secondurl + ' scraping is next!');
                                }
                            });
                            //console.log('la data existe ? ' + dataexists);
                        }

                        if (dataexists) {
                            var htmltable = value.table;
                            console.log('Initiating scraping for '+secondurl)
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
                                future.return({claimtype : 'Dental',claims: data});
                            })
                        } else {
                            //la data no existe imprimir el table error
                            future.return({datanoexists: "We found no claims in table#sortTable."}, {claims: []});

                        }
                    }
                })
                .run();

                }, 5000)
                // accumulate asynchronously parallel tasks
                return future;
            });
            // iterate sequentially over the tasks to resolve them
            var results = _.map(futures, function (future, index) {
                // waiting until the future has return
                var result = future.wait();
                //console.log("result from task", index, "is", result);

                loadClaims(myuser_id, "aetna", result)
                // accumulate results
                return result;
            });
            //
            console.log(results.claims);
            return results;

        },
        Update_user_Claims_with_options: function (n, providername) {
            console.log('--------------------------------Loading process Initiated------------------------------------');

            var myuser_id = this.userId;
            var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: providername});

            // build a range of tasks from 0 to n-1
            var range = _.range(n);
            // iterate sequentially over the range to launch tasks
            var futures = _.map(range, function (index) {
                var future = new Future();
                console.log("Setting up tasks for index #", index);
                // simulate an asynchronous HTTP request using a setTimeout
                var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];
                var mainurl2 = process.env["PROVIDERS_URL_AETNA_LOGIN_2"];
                var urlmedical = process.env["PROVIDERS_URL_AETNA_MEDICAL"];
                var urlfarmacy = process.env["PROVIDERS_URL_AETNA_PHARMACY"];
                var urldental = process.env["PROVIDERS_URL_AETNA_DENTAL"];;
                var secondurl = '';

                var x = Xray();

                if (index == 0) {
                    secondurl = urlmedical;
                }
                else if (index == 1) {
                    secondurl = urlfarmacy;
                }
                else if (index == 2) {
                    secondurl = urldental;
                }

                Meteor.setTimeout(function () {
                    var options = new nightmare()
                        .goto(mainurl)
                        .wait("#secureLoginBtn")
                        .type('input#userNameValue', providerdata.provider_user_name)
                        .type('input#passwordValue', providerdata.provider_password)
                        .click('#secureLoginBtn')
                        .wait()
                        .check("#planSponsorIndex")
                        .click("#go-button label")
                        .wait()
                        .goto(secondurl)
                        .wait()
                        .evaluate(function () {
                            return {
                                table: document.querySelector('html').outerHTML
                            };
                        }, function (value) {
                            //medical
                            if (index == 0) {
                                //validating the data
                                var dataexists = false;

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
                                            console.log('table#sortTable was found for ' + secondurl + ' scraping is next!');
                                        }
                                    });
                                    //console.log('la data existe ? ' + dataexists);
                                }

                                if (dataexists) {
                                    var htmltable = value.table;
                                    console.log('Initiating scraping for '+secondurl)
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
                                        console.log('Wrapping up scraping for '+secondurl);
                                        future.return({claimtype : 'Medical', claims: data});
                                    })
                                }
                                else {
                                    //la data no existe imprimir el table error
                                    future.return({datanoexists: "We found no claims in table#sortTable."}, {claims: []});
                                }
                            }
                            //farmacy
                            else if (index == 1) {
                                //validating the data
                                var dataexists = false;

                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('No HTML found on ' + secondurl);
                                } else {
                                    var htmltable = value.table;
                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        if (table == '' || table == undefined) {
                                            console.log('No pharmacy data was found.');
                                        } else {
                                            dataexists = true;
                                            console.log('table#sortTable was found for ' + secondurl + ' scraping is next!');
                                        }
                                    });
                                    //console.log('la data existe ? ' + dataexists);
                                }

                                if (dataexists) {
                                    var htmltable = value.table;
                                    console.log('Initiating scraping for '+secondurl)
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
                                        console.log('Wrapping up scraping for '+secondurl);
                                        future.return({claimtype : 'Pharmacy', claims: data});
                                    })
                                } else {
                                    //la data no existe imprimir el table error
                                    future.return({datanoexists: "We found no claims in table#sortTable."}, {claims: []});

                                }
                            }
                            //dental
                            else if (index == 2) {
                                //validating the data
                                var dataexists = false;

                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('No HTML found on ' + secondurl);
                                } else {
                                    var htmltable = value.table;

                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        console.log(table) // Google
                                        if (table == '' || table == undefined) {
                                            console.log('No dental data was found.');
                                        } else {
                                            dataexists = true;
                                            console.log('table#sortTable was found for ' + secondurl + ' scraping is next!');
                                        }
                                    });
                                }

                                if (dataexists) {
                                    var htmltable = value.table;
                                    console.log('Initiating scraping for '+secondurl)
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
                                        console.log('Wrapping up scraping for '+secondurl);
                                        future.return({claimtype : 'Dental',claims: data});
                                    })
                                } else {
                                    //la data no existe imprimir el table error
                                    future.return({datanoexists: "We found no claims in table#sortTable."}, {claims: []});


                                }
                            }
                        })
                        .run();

                }, 5000)
                // accumulate asynchronously parallel tasks
                return future;
            });
            // iterate sequentially over the tasks to resolve them
            var results = _.map(futures, function (future, index) {
                // waiting until the future has return
                var result = future.wait();
                //console.log("result from task", index, "is", result);

                loadClaims(myuser_id, "aetna", result)
                // accumulate results
                return result;
            });
            //
            //console.log(results.claims);
            return results;

        }
    });

    function loadClaims(user,provider,  data)
    {
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

                    Claims.insert({
                        user_id: user,
                        claim_id : claimid,
                        "type": data.claimtype,
                        "provider": provider,
                        "date_of_service": new Date(s(item.date_of_service).trim().value()),
                        "member": item.member,
                        "facility": item.facility,
                        "status": item.status,
                        "claim_amount": Number(s(s.splice(s(item.claim_amount ).trim().value(),0,1,"")).trim().value()) * 100,
                        "paid_by_plan": Number(s(s.splice(s(item.paid_by_plan ).trim().value(),0,1,"")).trim().value()) * 100,
                        provider_rate : null,
                        personal_rate : null,
                        EOB : null
                    });
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
                    Claims.insert({
                        user_id: user,
                        claim_id : claimid,
                        "type": data.claimtype,
                        "provider": provider,
                        "date_of_service": new Date(s(item.date_of_service).trim().value()),
                        "member": item.member,
                        "facility": item.facility,
                        "status": item.status,
                        "claim_amount": Number(s(s.splice(s(item.claim_amount ).trim().value(),0,1,"")).trim().value()) * 100,
                        "paid_by_plan": Number(s(s.splice(s(item.paid_by_plan ).trim().value(),0,1,"")).trim().value()) * 100,
                        provider_rate : null,
                        personal_rate : null,
                        EOB : null

                    });
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
                    Claims.insert({
                        user_id: user,
                        claim_id : claimid,
                        "type": data.claimtype,
                        "provider": provider,
                        "date_of_service": new Date(s(item.date_of_service).trim().value()),
                        "member": item.member,
                        "serviced_by" : servicedby,
                        "prescription_number" : prescriptionnumber,
                        "status" : item.status,
                        "drug_name" : item.drug_name,
                        "prescription_cost" : Number(s(s.splice(s(item.prescription_cost ).trim().value(),0,1,"")).trim().value()) * 100,
                        "paid_by_plan" : Number(s(s.splice(s(item.paid_by_plan ).trim().value(),0,1,"")).trim().value()) * 100,
                        provider_rate : null,
                        personal_rate : null,
                        EOB : null
                    });
                })
            }
        };
    }
}