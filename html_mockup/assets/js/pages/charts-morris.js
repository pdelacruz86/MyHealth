$( document ).ready(function() {
    Morris.Bar({
        element: 'morris2',
        data: [
            { member: 'You', a: 0, b: 5750.00 },
            { member: 'Abraham', a: 0, b: 5750.00  },
            { member: 'Annabel', a: 198.85, b: 5750.00  },
            { member: 'Thomas', a: 100, b: 5750.00  }
        ],
        xkey: 'member',
        ykeys: ['a', 'b'],
        labels: ['Contribution', 'Deductible'],
        barRatio: 0.4,
        xLabelAngle: 35,
        hideHover: 'auto',
        stacked: true,
        barColors: ['#6ad6c3','#22BAA0'],
        resize: true
    });

    Morris.Donut({
        element: 'morris4',
        data: [
            {label: 'Medical', value: 243.53},
            {label: 'Pharmacy', value: 126.6 },
            {label: 'Dental', value: 0 },
            {label: 'Vision', value: 0 }
        ],
        resize: true,
        colors: ['#74e4d1', '#44cbb4', '#119d85','#22BAA0'],
        formatter: function(y,data){return '$' + y}
    });
});