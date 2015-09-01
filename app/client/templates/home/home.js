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
      return $('.selectedmember').val();
    }
});

Template.home.events({
    'change #familyselect' : function(evt){
        evt.preventDefault();
        var selected = $('#familyselect').find(":selected")
        console.log("Changed", selected)
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

    var dentalCount = 0;//Claims.find({type : 'Dental'}).count();
    var pharmacyCount = 0;//Claims.find({type : 'Pharmacy'}).count();
    var medicalCount = 0;//Claims.find({type : 'Medical'}).count();
    var visionCount = 0;//Claims.find({type : 'Vision'}).count();

    var dentalclaimvalue = 0, pharmacyclaimvalue = 0, medicalclaimvalue = 0;

   //medicalCount = Meteor.call("dashboard/get_claim_chart_data", "Medical")
   // console.log(medicalCount);
   //
   // dentalCount = Meteor.call("dashboard/get_claim_chart_data", "Dental");
    Meteor.call("dashboard/get_claim_chart_data", "Pharmacy", function(err, data)
    {
        var pharmacydata = _.find(data, function(item){
            return item._id.type.type == "Pharmacy"
        });

        var medicaldata = _.find(data, function(item){
            return item._id.type.type == "Medical"
        });

        var dentaldata = _.find(data, function(item){
            return item._id.type.type == "Dental"
        });

        if(dentaldata != undefined){
            dentalclaimvalue = dentaldata.totalClaimRate;
            dentalCount = dentaldata.count;
        }
        if(pharmacydata != undefined) {
            pharmacyclaimvalue = pharmacydata.totalClaimRate;
            pharmacyCount = pharmacydata.count;
        }
        if(medicaldata != undefined) {
            medicalclaimvalue = medicaldata.totalClaimRate;
            medicalCount = medicaldata.count;
        }
        var total = medicalclaimvalue+pharmacyclaimvalue+dentalclaimvalue;

        Morris.Donut({
            element: 'morris4',
            data: [
                {label: 'All', value: total },
                {label: 'Medical', value: medicalclaimvalue },
                {label: 'Pharmacy', value: pharmacyclaimvalue },
                {label: 'Dental', value: dentalclaimvalue }
                //, {label: 'Vision', value: visionCount }
            ],
            formatter : function (y, data) { return '$' + y.toFixed(2) },
            resize: true,
            colors: ['rgb(34, 130, 186)', 'rgb(44, 154, 218)', 'rgb(89, 169, 216)','rgb(113, 180, 220)','rgb(146, 194, 222)'],
        });

    })

    Morris.Area({
        element: 'morris3',
        data: [
            {month: '2015-01', a: 40, b: 785, c: 100},
            {month: '2015-02', a: 150, b: 1570, c: 280},
            {month: '2015-03', a: 190, b: 2355, c: 310},
            {month: '2015-04', a: 290, b: 3140, c: 480},
            {month: '2015-05', a: 330, b: 3925, c: 580},
            {month: '2015-06', a: 380, b: 4710, c: 780},
            {month: '2015-07', a: 420, b: 5495, c: 880}
        ],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['Member Rate','Insurance Cost','Claim Amount'],
        xLabels: 'month',
        hideHover: 'auto',
        lineColors: ['rgb(34, 130, 186)', 'rgb(89, 169, 216)'],
        //goals: [8000],
        resize: true,
    });
}