/*****************************************************************************/
/* CostOfInsurance: Event Handlers */
/*****************************************************************************/
Template.CostOfInsurance.events({


});

/*****************************************************************************/
/* CostOfInsurance: Helpers */
/*****************************************************************************/
Template.CostOfInsurance.helpers({

});

/*****************************************************************************/
/* CostOfInsurance: Lifecycle Hooks */
/*****************************************************************************/
Template.CostOfInsurance.created = function () {

};

Template.CostOfInsurance.rendered = function () {
    var count = Claims.find({provider_rate : { $ne : null}}).count();

    //if( count > 43) {
        var member_id = Template.home.__helpers.get("selectedMember")();

        var member = {};
        if (member_id == undefined)
            member = Members.findOne({member_name: "Family"});
        else
            member = Members.findOne({_id: member_id});

        var dataarray = [];

        var profile = HB_Profiles.findOne();
        var period = profile.plan_performance_data.period;
        var amounttopaybyperiod = profile.plan_performance_data.to_pay;

        var insurancecost = 0;
        var suminsurancecost = 0;

        var memberrate = 0;
        var claimamount = 0;

        var currentmonth = moment().month();

        for (i = 1; i < currentmonth + 1; i++) {
            //get the current date
            //initial date data
            //var month = moment().month();
            //var year = moment().year();
            var initialday = 1;

            var currentdate = moment().startOf('year').add(i - 1, 'M');
            var currentdatemonth = moment(currentdate).month();
            var currentdateyear = moment(currentdate).year();


            var startdate = currentdate.format('YYYY-MM-DD');
            ;//moment([year,month, initialday]).subtract(i, 'M').format('YYYY-MM-DD');


            //end date data
            //var daysinmonth = moment([year,month, initialday]).subtract(i, 'M').daysInMonth();
            var daysinmonth = currentdate.daysInMonth();
            var enddate = moment([currentdateyear, currentdatemonth, daysinmonth]).format('YYYY-MM-DD')

            //insurance cost (leer de profile)
            //member rate
            //claim amount

            if (period == "Weekly") {
                var amountdividedbyperiod = (amounttopaybyperiod / 7);
                insurancecost = amountdividedbyperiod * daysinmonth;

            } else if (period == "Bi-Weekly") {
                var amountdividedbyperiod = (amounttopaybyperiod / 14);
                insurancecost = amountdividedbyperiod * daysinmonth;
            } else if (period == "Monthly") {
                insurancecost = amounttopaybyperiod * 1;
            } else if (period == "Yearly") {
                var amountdividedbyperiod = (amounttopaybyperiod / 365);
                insurancecost = amountdividedbyperiod * daysinmonth;
            }

            suminsurancecost = suminsurancecost + insurancecost;

            //console.log(amounttopaybyperiod, insurancecost, suminsurancecost);
            var claimsbyedate = {};


            if (member.member_name == "Family") {
                claimsbyedate = Claims.find({
                    status: "Completed",
                    provider_rate: {$ne: NaN},
                    claim_amount: {$ne: NaN},
                    date_of_service: {
                        $gte: new Date(startdate),
                        $lt: new Date(enddate)
                    }
                }).fetch();

            } else {
                claimsbyedate = Claims.find({
                    member: member.member_name,
                    status: "Completed",
                    provider_rate: {$ne: NaN},
                    claim_amount: {$ne: NaN},
                    date_of_service: {
                        $gte: new Date(startdate),
                        $lt: new Date(enddate)
                    }
                }).fetch();

            }

            var sumproviderrate = 0;
            var sumclaimamount = 0;

            _.each(claimsbyedate, function (claim) {
                if (claim.type == "Pharmacy") {
                    sumclaimamount += (claim.prescription_cost / 100);

                } else {
                    sumclaimamount += (claim.claim_amount / 100);
                }

                sumproviderrate += (claim.provider_rate / 100);
            })

            memberrate = memberrate + sumproviderrate;
            claimamount = claimamount + sumclaimamount;

            var savings = claimamount - memberrate;

            dataarray.push({
                month: moment(currentdate).format('YYYY-MM'),
                //a : memberrate.toFixed(2),
                a: suminsurancecost.toFixed(2),
                b: savings.toFixed(2)
            })
        }

        Morris.Line({
            element: 'morris3',
            data: dataarray,
            xkey: 'month',
            ykeys: ['a', 'b'],
            //labels: ['Member Rate','Insurance Cost','Claim Amount'],
            labels: ['Cost of Insurance', 'Realized Value'],
            xLabels: 'month',
            hideHover: 'auto',
            lineColors: ['rgb(34, 130, 186)', 'rgb(89, 169, 216)', 'rgb(89, 109, 206)'],
            //goals: [8000],
            resize: true,
        });
    //}
};

Template.CostOfInsurance.destroyed = function () {
};
