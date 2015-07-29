$( document ).ready(function() {
    Morris.Bar({
        element: 'morris3',
        data: [
            { month: '2015-01', a: 50, b: 10 },
            { month: '2015-02', a: 100, b: 15 },
            { month: '2015-03', a: 00, b: 10 },
            { month: '2015-04', a: 25, b: 10 },
            { month: '2015-05', a: 75, b: 30 },
            { month: '2015-06', a: 25, b: 10 },
            { month: '2015-07', a: 00, b: 10 } 
        ],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['Medical', 'Prescription'],
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
            {label: 'Medical', value: 60 },
            {label: 'Dental', value: 10 },
            {label: 'Vision', value: 10 },
            {label: 'Pharmacy', value: 20 }
        ],
        resize: true,
        colors: ['#74e4d1', '#44cbb4', '#119d85','#22BAA0'],
    });
});