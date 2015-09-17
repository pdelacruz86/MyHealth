/*****************************************************************************/
/* ClaimsChart: Event Handlers */
/*****************************************************************************/
Template.ClaimsChart.events({
});

/*****************************************************************************/
/* ClaimsChart: Helpers */
/*****************************************************************************/
Template.ClaimsChart.helpers({
    claimcount : function(){

        var dates = Session.get("selectedDates");

        var member_id = Template.home.__helpers.get("selectedMember")();

        var member = {};

        if (member_id == undefined)
            member = Members.findOne({member_name: "Family"});
        else
            member = Members.findOne({_id: member_id});

        if(member == {} || member ==undefined){
            member =  Members.findOne();
        }

        var startdate = '';
        var enddate = '';

        if(dates == undefined){
             startdate = moment().startOf('year')._d;
              enddate = moment()._d;
        }
        else
        {
             startdate = dates.startdate;
             enddate = dates.enddate;
        }


        if (member.member_name == "Family") {

            return Claims.find({
                status: "Completed", date_of_service: {
                    $gte: new Date(startdate),
                    $lt: new Date(enddate)
                }
            }).count();
        }else{
            return Claims.find({
                status: "Completed", member: member.member_name, date_of_service: {
                    $gte: new Date(startdate),
                    $lt: new Date(enddate)
                }
            }).count();
        }
    }
});

/*****************************************************************************/
/* ClaimsChart: Lifecycle Hooks */
/*****************************************************************************/
Template.ClaimsChart.created = function () {
};

Template.ClaimsChart.rendered = function () {
    var member_id = Template.home.__helpers.get("selectedMember")();

    var selecteddates = Session.get("selectedDates");

    if(selecteddates == undefined){
        var start = moment().startOf('year'); var end=  moment();
        selecteddates = {startdate : start._d, enddate : end._d};
    }

    var member = {};
    if(member_id == undefined)
        member =  Members.findOne({member_name : "Family"});
    else
        member = Members.findOne({_id : member_id});

    if(member == {} || member ==undefined){
        member =  Members.findOne();
    }

        var dentalCount = 0;//Claims.find({type : 'Dental'}).count();
        var pharmacyCount = 0;//Claims.find({type : 'Pharmacy'}).count();
        var medicalCount = 0;//Claims.find({type : 'Medical'}).count();
        var visionCount = 0;//Claims.find({type : 'Vision'}).count();

        var dentalclaimvalue = 0, pharmacyclaimvalue = 0, medicalclaimvalue = 0;

        //medicalCount = Meteor.call("dashboard/get_claim_chart_data", "Medical")
        // console.log(medicalCount);
        //
        // dentalCount = Meteor.call("dashboard/get_claim_chart_data", "Dental");
        Meteor.call("dashboard/get_claim_chart_data", member.member_name, selecteddates, function (err, data) {
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
            $('#morris4').html('');

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
};

Template.ClaimsChart.destroyed = function () {
};
