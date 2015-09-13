/*****************************************************************************/
/* CurrentExpenditures: Event Handlers */
/*****************************************************************************/
Template.CurrentExpenditures.events({
});

/*****************************************************************************/
/* CurrentExpenditures: Helpers */
/*****************************************************************************/
Template.CurrentExpenditures.helpers({
});

/*****************************************************************************/
/* CurrentExpenditures: Lifecycle Hooks */
/*****************************************************************************/
Template.CurrentExpenditures.created = function () {
};

Template.CurrentExpenditures.rendered = function () {

    var selecteddates = Session.get("selectedDates");

    if(selecteddates == undefined){
        var start = moment().startOf('year'); var end=  moment();
        selecteddates = {startdate : start._d, enddate : end._d};
    }

    Meteor.call("dashboard/get_current_expenditures_chart_data", selecteddates, function(err, data){

        var members = Members.find({}).fetch();
        var bardata = [];

        _.each(members, function(item){

            var member  = item.membe_name;
            var deductiblevalue = 0;
            var contributionvalue = 0;

            var deductibleitem = _.find(item.plan_details, function(deducvalue){
                return s.clean(deducvalue.plan_features) == s.clean("In Network Annual Deductible Includes Pharmacy");
            });

            deductiblevalue = (deductibleitem.limit / 100).toFixed(2);

            var contributionitem = _.find(data, function(contrivalue){
                return contrivalue._id.member.member == item.member_name;
            });

            if(contributionitem != undefined){
                contributionvalue = contributionitem.totalClaimRate
            }else{
                if(item.member_name == "Family"){
                    _.each(data, function(item2){
                        contributionvalue = contributionvalue + item2.totalClaimRate;
                    })

                }
            }
            contributionvalue = (contributionvalue).toFixed(2)

            bardata.push( { member: item.member_name, a: contributionvalue, b: deductiblevalue })
        })

        Morris.Bar({
            element: 'morris2',
            data: bardata,
            xkey: 'member',
            ykeys: ['a', 'b'],
            labels: ['Contribution', 'Deductible'],
            barRatio: 0.4,
            xLabelAngle: 35,
            hideHover: 'auto',
            stacked: true,
            barColors: ['rgba(34, 152, 186, 0.69)','rgb(34, 130, 186)'],
            resize: true
        });


    })


};

Template.CurrentExpenditures.destroyed = function () {
};
