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


/* Count claims by type */

    var dentalCount = Claims.find({type : 'Dental'}).count();
    var pharmacyCount = Claims.find({type : 'Pharmacy'}).count();
    var medicalCount = Claims.find({type : 'Medical'}).count();
    var visionCount = Claims.find({type : 'Vision'}).count();
    var total = dentalCount+pharmacyCount+medicalCount+visionCount;

    Morris.Donut({
        element: 'morris4',
        data: [
            {label: 'All', value: total },
            {label: 'Medical', value: medicalCount },
            {label: 'Pharmacy', value: pharmacyCount },
            {label: 'Dental', value: dentalCount },
            {label: 'Vision', value: visionCount }
        ],
        resize: true,
        colors: ['rgb(34, 130, 186)', 'rgb(44, 154, 218)', 'rgb(89, 169, 216)','rgb(113, 180, 220)','rgb(146, 194, 222)'],
    });

        Morris.Bar({
        element: 'morris2',
        data: [
            { member: 'All', a: 370.13, b: 11500.00 },
            { member: 'You', a: 0, b: 5750.00 },
            { member: 'Abraham', a: 126.6, b: 5750.00  },
            { member: 'Annabel', a: 43.53, b: 5750.00  },
            { member: 'Thomas', a: 200, b: 5750.00  }
        ],
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

    Morris.Line({
        element: 'morris3',
        data: [
            {month: '2015-01', a: 40, b: 785},
            {month: '2015-02', a: 150, b: 1570},
            {month: '2015-03', a: 190, b: 2355},
            {month: '2015-04', a: 290, b: 3140},
            {month: '2015-05', a: 330, b: 3925},
            {month: '2015-06', a: 380, b: 4710},
            {month: '2015-07', a: 420, b: 5495}
        ],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['Member Savings','Insurance Cost'],
        xLabels: 'month',
        hideHover: 'auto',
        lineColors: ['rgb(34, 130, 186)', 'rgb(89, 169, 216)'],
        //goals: [8000],
        resize: true,
    });
    /*
    Morris.Donut({
        element: 'morris4',
        data: [
            {label: 'All Claims', value: 370.13},
            {label: 'Medical', value: 243.53},
            {label: 'Pharmacy', value: 126.6 },
            {label: 'Dental', value: 0 },
            {label: 'Vision', value: 0 }
        ],
        resize: true,
        colors: ['rgb(34, 130, 186)', 'rgb(44, 154, 218)', 'rgb(89, 169, 216)','rgb(113, 180, 220)','rgb(146, 194, 222)'],
        formatter: function(y,data){return '$' + y}
    });*/

    //console.log(dentalCount, pharmacyCount, medicalCount);

    //var x =Xray();
//console.log(System);
//
//  //console.log(appUppercase('testing'));
//
//    Meteor.setTimeout(function () {
//    //    console.log(http);
//    //    console.log(new nightmare().goto('https://e.csilaboratories.com/login').run());
//
//        HTTP.get("https://e.csilaboratories.com/login", function(value){
//            console.log(value);
//        })
//
//    }, 5000);
    //testing scraping
    //var options = new nightmare()
    //    .goto('https://e.csilaboratories.com/login')
    //    .wait()
    //    .url(function(url){
    //        console.log(url);
    //    })
    //    .evaluate(function () {
    //        return {
    //            htmldata: document.querySelector('html').outerHTML
    //        };
    //    },function (value) {
    //        var htmltable = value.htmldata;
    //        console.log(htmltable);
    //    })
    //    .run();


}