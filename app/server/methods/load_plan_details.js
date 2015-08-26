if (Meteor.isServer) {
    var Fiber = Npm.require('fibers')
    var Future = Npm.require("fibers/future");

    Meteor.methods({

        load_plan_details_no_options: function (providername) {
            console.log('--------------------------------Loading process Initiated------------------------------------');

            var myuser_id = this.userId;
            var providerdata = Providers.findOne({user_id :  myuser_id, provider_name: providername});

            // build a range of tasks from 0 to n-1
            //var range = _.range(n);

            // iterate sequentially over the range to launch tasks
            //var futures = _.map(range, function (index) {
            var future = new Future();

                console.log("Setting up tasks");
                // simulate an asynchronous HTTP request using a setTimeout
                var mainurl = process.env["PROVIDERS_URL_AETNA_LOGIN"];
                var mainurl2 = process.env["PROVIDERS_URL_MEDICAL_PLAN_DETAILS"];
                var secondurl = '';

                var x = Xray();

                secondurl = "https://member.aetna.com/memberSecure/featureRouter/balances?product=medical&typecode=M";

                Meteor.setTimeout(function () {
                    var options = new nightmare()
                        .goto(mainurl)
                        .wait("#secureLoginBtn")
                        .type('input#userNameValue', providerdata.provider_user_name)
                        .type('input#passwordValue', providerdata.provider_password)
                        .click('#secureLoginBtn')
                        .wait()
                        .goto(secondurl)
                        .wait()
                        .url(function(url){console.log(url)})
                        .evaluate(function () {
                            return {
                                htmldata: document.querySelector('html').outerHTML
                            };
                        },function (value) {
                            var htmltable =  value.htmldata ;
                            console.log('entro evaluate');

                            var alldata = [];
                            var members = [];


                            x(htmltable, '#selectPullDown0',
                                ['option']
                            )(function (err, data) {
                                members = data;
                            })

                            for(i = 0; i < members.length; i ++){
                                var selector = '.fundTable' + i  + ' tbody tr.normalSection';
                                var selectormember = 'ul#selectPullDown0_prim li a[index="' + i + '"]';
                                // console.log(selector)
                                x(htmltable, {
                                        member : 'ul#selectPullDown0_prim li a[index="' + i + '"]',
                                        plans:
                                            x(selector, [{
                                                plan_features: 'td:nth-child(1)',
                                                limit: 'td:nth-child(2)',
                                                applied: 'td:nth-child(3)',
                                                remainder: 'td:nth-child(4)'
                                            }])
                                    }
                                )(function (err, table) {
                                    alldata.push(table);
                                });
                            }

                            future.return({plan_summary: alldata});

                        })
                        .run();

                }, 5000)
                    // accumulate asynchronously parallel tasks
                    //return future;
            //});
            // iterate sequentially over the tasks to resolve them
            //var results = _.map(futures, function (future, index) {
                // waiting until the future has return
                var result = future.wait();
                //console.log("result from task is : ", result);

            result.plan_summary.forEach(function(item){
                //insert member get the id
                var memberid =  Members.insert(
                    {
                        user_id : myuser_id,
                        member_name: item.member,
                        plan_details : item.plans
                    })

                //insert the plan for the member
                //console.log(item.plans);
                //item.plans.forEach(function(plan){
                //    console.log(plan)
                //})
            });
                //loadClaims(myuser_id, "aetna", result)
                // accumulate results
            //    return result;
            //});
            //
            //console.log(results.claims);
            var members = Members.find({}).fetch();
            //console.log(members);
            return members;

        },
        load_plan_details_with_options: function (providername) {

        }
    });

    function loadClaims(user,provider,  data)
    {
            console.log(data);
    }
}