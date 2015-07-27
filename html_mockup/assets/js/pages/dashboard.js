$( document ).ready(function() {

    Morris.Donut({
        element: 'leftchar',
        data: [
            {label: 'Medical', value: 35 },
            {label: 'Dental', value: 45 },
            {label: 'Vision', value: 30 },
            {label: 'Pharma', value: 20 }
        ],
        resize: true,
        colors: ['#74e4d1', '#44cbb4', '#119d85','#22BAA0'],
    });

    $(".live-tile").liveTile();
    
});