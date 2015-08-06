if (Meteor.isServer) {
    var Fiber = Npm.require('fibers')
    var Future = Npm.require("fibers/future");

    Meteor.methods({

        Update_user_Claims: function (n, providername) {
            console.log('--------------------------------EMPEZO ------------------------------------');

            var myuser_id = this.userId;
            var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: providername});

            // build a range of tasks from 0 to n-1
            var range = _.range(n);
            // iterate sequentially over the range to launch tasks
            var futures = _.map(range, function (index) {
                var future = new Future();
                console.log("launching task", index);
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
                        //.wait("#claimSearchSubmitButton")
                        .wait(20000)
                        .goto(secondurl)
                        .wait(20000)
                        .evaluate(function () {
                            return {
                                table: document.querySelector('html').outerHTML
                            };
                        }, function (value) {
                            //console.log(value.table);
                            if (index == 0) {
                                //validating the data
                                var dataexists = false;
//console.log(value.table);
                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('Error pagina -- no html');
                                } else {
                                    var htmltable = value.table;


                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        if (table == '' || table == undefined) {
                                            console.log('No clinical DATA');
                                        } else {
                                            dataexists = true;
                                        }
                                    });

                                    console.log('la data existe ? ' + dataexists);
                                }

                                if (dataexists) {
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
                                        future.return({claimtype : 'Medical', claims: data});
                                    })
                                }
                                else {
                                    //la data no existe imprimir el table error
                                    future.return({datanoexists: "We have no claims to show."}, {claims: []});

                                }
                            }
                            else if (index == 1) {
                                //validating the data
                                var dataexists = false;

                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('Error pagina -- no html');
                                } else {
                                    var htmltable = value.table;


                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        if (table == '' || table == undefined) {
                                            console.log('No farmacy DATA');
                                        } else {
                                            dataexists = true;
                                        }
                                    });

                                    console.log('la data existe ? ' + dataexists);

                                }

                                if (dataexists) {
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
                                        future.return({claimtype : 'Pharmacy', claims: data});
                                    })
                                } else {
                                    //la data no existe imprimir el table error
                                    future.return({datanoexists: "We have no claims to show."}, {claims: []});

                                }
                            }
                            else if (index == 2) {
                                //validating the data
                                var dataexists = false;

                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('Error pagina -- no html');
                                } else {
                                    var htmltable = value.table;

                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        console.log(table) // Google
                                        if (table == '' || table == undefined) {
                                            console.log('No dental DATA');
                                        } else {
                                            dataexists = true;
                                        }
                                    });

                                    console.log('la data existe ? ' + dataexists);

                                }

                                if (dataexists) {
                                    var htmltable = value.table;

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
                                        future.return({claimtype : 'Dental',claims: data});
                                    })
                                } else {
                                    //la data no existe imprimir el table error
                                    future.return({claims: []});

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

        },
        Update_user_Claims_with_options: function (n, providername) {
            console.log('--------------------------------EMPEZO Con opciones------------------------------------');

            var myuser_id = this.userId;
            var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: providername});

            // build a range of tasks from 0 to n-1
            var range = _.range(n);
            // iterate sequentially over the range to launch tasks
            var futures = _.map(range, function (index) {
                var future = new Future();
                console.log("launching task", index);
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
                        }, function (value) {
                            //console.log(value.table);
                            if (index == 0) {
                                //validating the data
                                var dataexists = false;

                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('Error pagina -- no html');
                                } else {
                                    var htmltable = value.table;


                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        if (table == '' || table == undefined) {
                                            console.log('No clinical DATA');
                                        } else {
                                            dataexists = true;
                                        }
                                    });

                                    console.log('la data existe ? ' + dataexists);
                                }

                                if (dataexists) {
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
                                        future.return({claimtype : 'Medical', claims: data});
                                    })
                                }
                                else {
                                    //la data no existe imprimir el table error
                                    future.return({datanoexists: "We have no claims to show."}, {claims: []});
                                }
                            }
                            else if (index == 1) {
                                //validating the data
                                var dataexists = false;

                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('Error pagina -- no html');
                                } else {
                                    var htmltable = value.table;


                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        if (table == '' || table == undefined) {
                                            console.log('No farmacy DATA');
                                        } else {
                                            dataexists = true;
                                        }
                                    });

                                    console.log('la data existe ? ' + dataexists);

                                }

                                if (dataexists) {
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
                                        future.return({claimtype : 'Pharmacy', claims: data});
                                    })
                                } else {
                                    //la data no existe imprimir el table error
                                    future.return({datanoexists: "We have no claims to show."}, {claims: []});

                                }
                            }
                            else if (index == 2) {
                                //validating the data
                                var dataexists = false;

                                if (value == null) {
                                    //var htmltable =  value.errorTable ;
                                    console.log('Error pagina -- no html');
                                } else {
                                    var htmltable = value.table;

                                    x(htmltable, 'table#sortTable')(function (err, table) {
                                        console.log(table) // Google
                                        if (table == '' || table == undefined) {
                                            console.log('No dental DATA');
                                        } else {
                                            dataexists = true;
                                        }
                                    });

                                    console.log('la data existe ? ' + dataexists);

                                }

                                if (dataexists) {
                                    var htmltable = value.table;

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
                                        future.return({claimtype : 'Dental',claims: data});
                                    })
                                } else {
                                    //la data no existe imprimir el table error
                                    future.return({claims: []});

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

            data.claims.forEach(function (item) {
                item.provider = provider;
                item.type = data.claimtype;
                HB_Profiles.update({user_id: user}, {$push: {"claims": item}});
            })
        };
    }
}