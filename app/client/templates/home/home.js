//https://github.com/raix/Meteor-handlebar-helpers#raixhandlebar-helpers-

Template.home.helpers({
    //Get the family member in the Members list
    memberFamilyItem : function(){
        return Members.findOne({member_name : "Family"});
    },
    //get all members from a user.
    memberList: function() {
        return Members.find();
    },
    selectedMember : function(){
      return Session.get("selectedMember");
    },
    providerRateLoadCompleted : function(){
        return Claims.find({provider_rate : null, status : "Completed"}).count() == 0;
    },
    partialDataLoad : function(){
        var count = Claims.find({provider_rate : { $ne : null}, status : "Completed"}).count();
        return count > 0;
    },
    claimsDataLoad : function(){
        var count = Claims.find().count();
        var membercount = Members.find().count();

        return count > 0 || membercount > 0;
    },
    HasPlanPerformance : function(){
        return HB_Profiles.find({plan_performance_data : { $ne : null }}).count() > 0;
    }
});

Template.home.events({
    'change #familyselect' : function(evt) {
        evt.preventDefault();
        $("#familyselect option").attr("class", "")

        var selected = $('#familyselect').find(":selected").attr("class", "selectedmember");

        //$('#morris3').html('');
        $('#morris4').html('');
        //$('dv#dvClaims').html('');
        //$('dv#dvPlanPerformance').html('');
        //$('dv#dvEOB').html('');

        Session.set("selectedMember",  $('#familyselect').find(":selected").val());

        var instance = UI.renderWithData(Template.ClaimsChart);
        UI.insert(instance, $('dvClaims'));

        //var instance2 = UI.renderWithData(Template.PlanPerformance);
        //UI.insert(instance2, $('dvPlanPerformance'));
        //
        //var instance3 = UI.renderWithData(Template.ExaplanationsOfBenefits);
        //UI.insert(instance3, $('dvEOB'));
    },
    "click #linkSetupGraph" : function(evt){
        evt.preventDefault();

        $("#setupGraphPanel").attr("style", "display:block")
        $("#linkSetupGraph").attr("style", "display:none")

    },
    "click #submitGraphSetup" : function(evt){

        console.log('entro setup graph');
        var topay = $("#inputToPay").val();
        var period = $("#selectPeriod :selected").val();
        var provider = $("#selectProvider :selected").val();

        var planPerformance = {
            to_pay: topay,
            period : period,
            provider: provider
        };
        Meteor.call("dashboard/update_profile_setup_plan_performance_data", planPerformance);
    }
});


Template['home'].rendered = function(){
/*
    var dataarray = [];

    for (i = 1; i < 8; i++) {
        //get the current date
        //initial date data
        var month = moment().month();
        var year = moment().year();
        var initialday = 1;
        var startdate = moment([year,month, initialday]).subtract(i, 'M').format('YYYY-MM-DD');

        //end date data
        var daysinmonth = moment([year,month, initialday]).subtract(i, 'M').daysInMonth();
        var enddate = moment([year,month, daysinmonth]).subtract(i, 'M').format('YYYY-MM-DD')


        var medicalcount = Claims.find({
            //user_id : "26uEAN2DBaJRufBe9" ,
            type : "Medical",
            date_of_service: {
            $gte: new Date(startdate),
                $lt: new Date(enddate)
            }
        }).count();

        var dentalcount = Claims.find({
            //user_id : "26uEAN2DBaJRufBe9" ,
            type : "Dental",
            date_of_service: {
                $gte: new Date(startdate),
                $lt: new Date(enddate)
            }
        }).count();

        var pharmacycount = Claims.find({
            //user_id : "26uEAN2DBaJRufBe9" ,
            type : "Pharmacy",
            date_of_service: {
                $gte: new Date(startdate),
                $lt: new Date(enddate)
            }
        }).count();

        dataarray.push({
            month : moment(startdate).format('YYYY-MM'),
            a : medicalcount,
            b : pharmacycount,
            c : dentalcount
        })
    }

    Morris.Bar({
        element: 'morris3',
        data: dataarray,
        xkey: 'month',
        ykeys: ['a', 'b', 'c'],
        labels: ['Medical', 'Prescription', 'Dental'],
        barRatio: 0.4,
        xLabelAngle: 35,
        hideHover: 'auto',
        stacked: true,
        barColors: ['#6ad6c3','#22BAA0'],
        resize: true
    });


/* Count claims by type */

    if(Providers.find({}).count() == 0){
        Router.go("providers");
    }
    //setting up the profile
    var userid = Meteor.userId();

    var valid  = HB_Profiles.find({user_id : userid}).count();

    console.log('profile count', valid, "user id", userid);

    if(valid == 0){
        Meteor.call("create_profile", function(error, user_id) {
            console.log(user_id);
        });
    }

    //setting up the members
    var familymember = Members.findOne({member_name : "Family"});
    Session.set("selectedMember", familymember._id);

    //setting up range date time filters


    function cb(start, end) {
        debugger;
        $('#daterange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        Session.set("selectedDates", {startdate : start._d, enddate : end._d});
    }
    cb(moment().startOf('year'), moment());

    $('#daterange').daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

}