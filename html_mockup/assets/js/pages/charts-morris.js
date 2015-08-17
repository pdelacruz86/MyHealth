$( document ).ready(function() {
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
    });
});