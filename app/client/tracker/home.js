/**
 * Created by pdelacruz on 9/9/15.
 */


var loadClaimChart = function loadClaimChart(){

    var member_id = Template.home.__helpers.get("selectedMember")();

    var member = {};
    if(member_id == undefined)
        member =  Members.findOne({member_name : "Family"});
    else
        member = Members.findOne({_id : member_id});

    var dentalCount = 0;//Claims.find({type : 'Dental'}).count();
    var pharmacyCount = 0;//Claims.find({type : 'Pharmacy'}).count();
    var medicalCount = 0;//Claims.find({type : 'Medical'}).count();
    var visionCount = 0;//Claims.find({type : 'Vision'}).count();

    var dentalclaimvalue = 0, pharmacyclaimvalue = 0, medicalclaimvalue = 0;

    if(member != undefined && member != {}){
        Meteor.call("dashboard/get_claim_chart_data", member.member_name, function (err, data) {
        var pharmacydata = _.find(data, function (item) {
            return item._id.type.type == "Pharmacy"
        });

        var medicaldata = _.find(data, function (item) {
            return item._id.type.type == "Medical"
        });

        var dentaldata = _.find(data, function (item) {
            return item._id.type.type == "Dental"
        });

        if (dentaldata != undefined) {
            dentalclaimvalue = dentaldata.totalClaimRate;
            dentalCount = dentaldata.count;
        }
        if (pharmacydata != undefined) {
            pharmacyclaimvalue = pharmacydata.totalClaimRate;
            pharmacyCount = pharmacydata.count;
        }
        if (medicaldata != undefined) {
            medicalclaimvalue = medicaldata.totalClaimRate;
            medicalCount = medicaldata.count;
        }
        var total = medicalclaimvalue + pharmacyclaimvalue + dentalclaimvalue;
        $("#morris4").html("");

        Morris.Donut({
            element: 'morris4',
            data: [
                {label: 'All', value: total},
                {label: 'Medical', value: medicalclaimvalue},
                {label: 'Pharmacy', value: pharmacyclaimvalue},
                {label: 'Dental', value: dentalclaimvalue}
                //, {label: 'Vision', value: visionCount }
            ],
            formatter: function (y, data) {
                return '$' + s.numberFormat(y, 2, ".", ",");
            },
            resize: true,
            colors: ['rgb(34, 130, 186)', 'rgb(44, 154, 218)', 'rgb(89, 169, 216)', 'rgb(113, 180, 220)', 'rgb(146, 194, 222)'],
        });
    })
    }


}

loadPlanPerformanceChart = function loadPlanPerformanceChart(){
    var count = Claims.find({provider_rate : { $ne : null}}).count();

    //if( count > 43) {
    var member_id = Template.home.__helpers.get("selectedMember")();

    var member = {};
    if (member_id == undefined)
        member = Members.findOne({member_name: "Family"});
    else
        member = Members.findOne({_id: member_id});

    if(member != undefined && member != {}){

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

        $("#morris3").html("");

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

    }
}


Tracker.autorun(function(c){
    var collection1 = Claims.find({ provider_rate : null, status : "Completed"}).count();

    loadClaimChart();
    loadPlanPerformanceChart();

    console.log('tracker autorun')
});

