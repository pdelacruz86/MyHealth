Template.home.helpers({

});

Template.home.events({

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
*/

// Count claims by type

    var dentalCount = Claims.find({type : 'Dental'}).count();
    var pharmacyCount = Claims.find({type : 'Pharmacy'}).count();
    var medicalCount = Claims.find({type : 'Medical'}).count();

    Morris.Donut({
        element: 'morris4',
        data: [
            {label: 'Medical', value: medicalCount },
            {label: 'Dental', value: dentalCount },
            {label: 'Pharmacy', value: pharmacyCount }
        ],
        resize: true,
        colors: ['#74e4d1', '#44cbb4', '#119d85','#22BAA0'],
    });

    console.log(dentalCount, pharmacyCount, medicalCount);

}